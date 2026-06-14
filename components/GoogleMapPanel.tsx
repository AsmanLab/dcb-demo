'use client';
import React, { useEffect, useRef, useState } from 'react';
import type { Department } from '@/lib/branches';

interface Props {
  apiKey: string;
  departments: Department[];   // visible (filtered) list
  selected: Department;
  onSelect: (d: Department) => void;
}

// Minimal typings for the parts of the Maps JS API we use — avoids pulling in
// @types/google.maps just for this panel.
type GMap = { panTo(p: { lat: number; lng: number }): void; setZoom(z: number): void };
type GMarker = { setMap(m: GMap | null): void; addListener(ev: string, cb: () => void): void };
interface GoogleMaps {
  maps: {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => GMap;
    Marker: new (opts: Record<string, unknown>) => GMarker;
    Animation: { DROP: unknown; BOUNCE: unknown };
  };
}
declare global {
  interface Window { google?: GoogleMaps; __dcbMapsPromise?: Promise<void> }
}

function loadMaps(apiKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject();
  if (window.google?.maps) return Promise.resolve();
  if (window.__dcbMapsPromise) return window.__dcbMapsPromise;
  window.__dcbMapsPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=ru`;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('maps load failed'));
    document.head.appendChild(s);
  });
  return window.__dcbMapsPromise;
}

function haversine(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function GoogleMapPanel({ apiKey, departments, selected, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<GMap | null>(null);
  const markersRef = useRef<Map<number, GMarker>>(new Map());
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const withCoords = departments.filter(d => d.lat !== null && d.lng !== null);

  // Init map once.
  useEffect(() => {
    let cancelled = false;
    loadMaps(apiKey)
      .then(() => {
        if (cancelled || !ref.current || !window.google) return;
        setReady(true);
        mapRef.current = new window.google.maps.Map(ref.current, {
          center: { lat: selected.lat ?? 41.2, lng: selected.lng ?? 74.7 },
          zoom: 7,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]);

  // Sync markers to the filtered list.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !window.google) return;
    const g = window.google.maps;
    const next = new Set(withCoords.map(d => d.id));

    markersRef.current.forEach((marker, id) => {
      if (!next.has(id)) { marker.setMap(null); markersRef.current.delete(id); }
    });

    withCoords.forEach(dep => {
      if (markersRef.current.has(dep.id)) return;
      const marker = new g.Marker({
        position: { lat: dep.lat!, lng: dep.lng! },
        map,
        title: dep.name,
        animation: g.Animation.DROP,
      });
      marker.addListener('click', () => onSelect(dep));
      markersRef.current.set(dep.id, marker);
    });
  }, [withCoords, onSelect]);

  // Pan to the selected branch.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || selected.lat === null || selected.lng === null) return;
    map.panTo({ lat: selected.lat, lng: selected.lng });
    map.setZoom(14);
  }, [selected]);

  const locateNearest = () => {
    if (!navigator.geolocation || withCoords.length === 0) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      let best = withCoords[0];
      let bestD = Infinity;
      for (const d of withCoords) {
        const dist = haversine(me, { lat: d.lat!, lng: d.lng! });
        if (dist < bestD) { bestD = dist; best = d; }
      }
      onSelect(best);
    });
  };

  if (failed) {
    // Key present but the script failed — let the parent render the iframe.
    return null;
  }

  return (
    <div className="absolute inset-0">
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface)] animate-pulse">
          <span className="text-sm text-[var(--muted)]">Загрузка карты…</span>
        </div>
      )}
      <div ref={ref} className="w-full h-full" />
      <button
        onClick={locateNearest}
        className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[var(--bg)] border border-[var(--border)] shadow-lg text-sm font-semibold text-[var(--text)] hover:text-brand transition-colors"
      >
        📍 Ближайшее ко мне
      </button>
    </div>
  );
}
