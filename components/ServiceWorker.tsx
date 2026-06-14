'use client';
import { useEffect } from 'react';

// Registers the PWA service worker (production only — avoids caching churn in dev).
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;
    const register = () => navigator.serviceWorker.register('/sw.js').catch(() => {});
    window.addEventListener('load', register);
    return () => window.removeEventListener('load', register);
  }, []);
  return null;
}
