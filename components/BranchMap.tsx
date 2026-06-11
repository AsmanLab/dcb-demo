'use client';
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import { DEPARTMENTS, REGIONS, type Department } from '@/lib/branches';

type Filter = 'all' | 'branch' | 'sberkassa';

// Google Maps embed needs no API key: coordinates when the source site
// provides them, otherwise an address search query.
function mapSrc(dep: Department): string {
  const q = dep.lat !== null && dep.lng !== null
    ? `${dep.lat},${dep.lng}`
    : `Дос-Кредобанк, ${dep.address}, Кыргызстан`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&hl=ru&output=embed`;
}

export function BranchMap() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>('all');
  const [region, setRegion] = useState('');
  const [show247, setShow247] = useState(false);
  const [selected, setSelected] = useState<Department>(DEPARTMENTS.find(d => d.id === 2) ?? DEPARTMENTS[0]);

  const filtered = useMemo(() => DEPARTMENTS.filter(dep => {
    if (filter !== 'all' && dep.type !== filter) return false;
    if (region && dep.region !== region) return false;
    if (show247 && !dep.is247) return false;
    return true;
  }), [filter, region, show247]);

  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: t('map.filter.all') },
    { id: 'branch', label: t('map.filter.filials') },
    { id: 'sberkassa', label: t('map.filter.sber') },
  ];

  return (
    <Section id="map" className="py-14 sm:py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)] mb-3">
            {t('map.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg">{t('map.subtitle')}</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center items-center mb-8">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === id
                  ? 'bg-brand text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--text)]'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setShow247(!show247)}
            aria-pressed={show247}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              show247
                ? 'bg-emerald-700 text-white'
                : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--text)]'
            }`}
          >
            {t('map.filter.247')}
          </button>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            aria-label={t('map.allRegions')}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] cursor-pointer focus:outline-none focus:border-brand"
          >
            <option value="">{t('map.allRegions')}</option>
            {REGIONS.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Google Map */}
          <div className="lg:col-span-2 rounded-3xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden relative min-h-72">
            <iframe
              key={selected.id}
              src={mapSrc(selected)}
              title={selected.name}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Department cards */}
          <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
            <p className="text-xs text-[var(--muted)] px-1">
              {t('map.found')}: {filtered.length}
            </p>
            {filtered.map((dep, i) => {
              const isSelected = dep.id === selected.id;
              return (
                <motion.button
                  key={dep.id}
                  onClick={() => setSelected(dep)}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i, 8) * 0.04 }}
                  className={`w-full text-left p-4 rounded-2xl bg-[var(--surface)] border transition-all ${
                    isSelected ? 'border-brand' : 'border-[var(--border)] hover:border-brand/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={isSelected ? 'text-brand mt-0.5' : 'text-[var(--muted)] mt-0.5'} aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[var(--text)] truncate">{dep.name}</p>
                        {dep.is247 && (
                          <span className="flex-shrink-0 px-1.5 py-0.5 rounded-full bg-emerald-700/10 text-emerald-700 text-[10px] font-bold">
                            24/7
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{dep.address}</p>
                      <p className="text-[10px] text-[var(--muted)]/70 mt-0.5">{dep.region}</p>
                      <div className="flex flex-wrap items-center gap-x-2 mt-1">
                        {dep.hours.map(h => (
                          <span key={h} className={`text-xs font-medium ${dep.is247 ? 'text-emerald-700' : 'text-[var(--muted)]'}`}>
                            {h}
                          </span>
                        ))}
                        {dep.phone && (
                          <a
                            href={`tel:${dep.phone}`}
                            onClick={e => e.stopPropagation()}
                            className="text-xs text-brand hover:underline"
                          >
                            {dep.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
