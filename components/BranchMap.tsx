'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import { BRANCH_LOCATIONS } from '@/lib/data';

type Filter = 'all' | 'branch' | 'atm' | 'exchange';

export function BranchMap() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>('all');
  const [show247, setShow247] = useState(false);

  const filtered = BRANCH_LOCATIONS.filter(loc => {
    if (filter !== 'all' && loc.type !== filter) return false;
    if (show247 && !loc.is247) return false;
    return true;
  });

  const filters: { id: Filter; labelKey: string }[] = [
    { id: 'all', labelKey: 'Все' },
    { id: 'branch', labelKey: t('map.filter.branches') },
    { id: 'atm', labelKey: t('map.filter.atm') },
    { id: 'exchange', labelKey: t('map.filter.exchange') },
  ];

  return (
    <Section id="map" className="py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
            {t('map.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg">{t('map.subtitle')}</p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {filters.map(({ id, labelKey }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              aria-pressed={filter === id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === id
                  ? 'bg-brand text-white shadow-[0_4px_12px_-4px_rgba(228,0,43,0.5)]'
                  : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:border-brand/40'
              }`}
            >
              {labelKey}
            </button>
          ))}
          <button
            onClick={() => setShow247(!show247)}
            aria-pressed={show247}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              show247
                ? 'bg-emerald-600 text-white'
                : 'bg-[var(--surface)] text-[var(--muted)] border border-[var(--border)] hover:border-emerald-500/40'
            }`}
          >
            {t('map.filter.247')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stylized map panel */}
          <div className="lg:col-span-2 rounded-3xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden relative min-h-72">
            {/* SVG map of Kyrgyzstan stylized */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 500 300" className="w-full h-full">
                <path d="M50 150 C80 80 180 40 280 60 C360 75 430 110 470 150 C440 200 350 240 250 250 C150 260 60 230 50 150Z" fill="currentColor" className="text-brand" />
              </svg>
            </div>
            {/* Location dots */}
            {[
              { x: '45%', y: '45%', label: 'Бишкек' },
              { x: '35%', y: '55%', label: 'Ош' },
              { x: '55%', y: '40%', label: 'Каракол' },
              { x: '40%', y: '35%', label: 'Токмок' },
            ].map(({ x, y, label }) => (
              <div
                key={label}
                className="absolute"
                style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-brand shadow-[0_0_8px_2px_rgba(228,0,43,0.5)]" />
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[var(--text)] whitespace-nowrap bg-[var(--surface)] px-1.5 py-0.5 rounded">
                    {label}
                  </span>
                </div>
              </div>
            ))}

            <p className="absolute bottom-4 right-4 text-xs text-[var(--muted)]">{t('map.note')}</p>
          </div>

          {/* Location cards */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {filtered.map((loc, i) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-brand/30 transition-all"
              >
                <div className="flex items-start gap-2">
                  <span className="text-brand mt-0.5" aria-hidden="true">
                    {loc.type === 'atm' ? '🏧' : loc.type === 'exchange' ? '💱' : '🏦'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[var(--text)] truncate">{loc.name}</p>
                    <p className="text-xs text-[var(--muted)]">{loc.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium ${loc.is247 ? 'text-emerald-400' : 'text-[var(--muted)]'}`}>
                        {loc.hours}
                      </span>
                      {loc.phone && (
                        <a href={`tel:${loc.phone}`} className="text-xs text-brand hover:underline">{loc.phone}</a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
