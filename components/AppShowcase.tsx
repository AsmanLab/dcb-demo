'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

const features: { key: DictKey; icon: string }[] = [
  { key: 'app.feature1', icon: '↗️' },
  { key: 'app.feature2', icon: '⊞' },
  { key: 'app.feature3', icon: '💳' },
  { key: 'app.feature4', icon: '📊' },
] as const;

export function AppShowcase() {
  const t = useT();

  return (
    <Section id="app" className="py-20 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="w-64 h-[500px] rounded-[2.5rem] bg-[var(--bg)] border-4 border-[var(--border)] shadow-2xl overflow-hidden flex flex-col">
                {/* Status bar */}
                <div className="h-8 bg-[var(--bg)] flex items-center justify-between px-6 pt-2">
                  <span className="text-[10px] font-semibold text-[var(--muted)]">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-1.5 rounded-sm bg-[var(--muted)]" />
                    <div className="w-1 h-1.5 rounded-sm bg-emerald-400" />
                  </div>
                </div>

                {/* Notch */}
                <div className="mx-auto w-24 h-5 rounded-b-2xl bg-[var(--surface-2)] -mt-1 mb-2" />

                {/* App content */}
                <div className="flex-1 px-4 py-2 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-[var(--muted)]">Добрый день,</p>
                      <p className="text-xs font-bold text-[var(--text)]">Азиз Исаков</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">А</span>
                    </div>
                  </div>

                  {/* Balance card */}
                  <div className="rounded-2xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, #FF3355, #B3001B)' }}>
                    <p className="text-white/60 text-[10px] mb-1">Баланс</p>
                    <p className="text-white font-display font-extrabold text-lg">287 450 сом</p>
                    <p className="text-white/60 text-[10px] mt-1">•••• 4892</p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {['↗', '⚡', '⊞', '🔔'].map((icon, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-9 h-9 rounded-xl bg-[var(--surface)] flex items-center justify-center text-sm">{icon}</div>
                      </div>
                    ))}
                  </div>

                  {/* Transactions */}
                  <p className="text-[10px] font-semibold text-[var(--muted)] mb-2">Последние операции</p>
                  {[
                    { name: 'Перевод Айбек', amount: '-5 000', color: 'text-red-400' },
                    { name: 'Зарплата', amount: '+150 000', color: 'text-emerald-400' },
                    { name: 'Кофе Starbucks', amount: '-380', color: 'text-red-400' },
                  ].map((tx, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-[var(--border)] last:border-0">
                      <p className="text-[10px] text-[var(--text)]">{tx.name}</p>
                      <p className={`text-[10px] font-semibold ${tx.color}`}>{tx.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 rounded-[2.5rem] shadow-[0_0_80px_-20px_rgba(228,0,43,0.3)] pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold mb-4">
                DCB 360 · Simbank
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
                {t('app.title')}
              </h2>
              <p className="text-[var(--muted)] text-lg">{t('app.subtitle')}</p>
            </div>

            <ul className="space-y-3" role="list">
              {features.map(({ key, icon }) => (
                <li key={key} className="flex items-center gap-3 text-[var(--text)]">
                  <span className="w-9 h-9 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-sm flex-shrink-0" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="text-sm font-medium">{t(key)}</span>
                </li>
              ))}
            </ul>

            {/* Store badges */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                aria-label="Скачать в App Store"
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--muted)] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text)]" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[10px] text-[var(--muted)]">Загрузить в</p>
                  <p className="text-xs font-semibold text-[var(--text)]">App Store</p>
                </div>
              </a>
              <a
                href="#"
                aria-label="Скачать в Google Play"
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--muted)] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--text)]" aria-hidden="true">
                  <path d="M3.18 23.76c.31.17.65.24 1 .22l12.28-7.08-2.64-2.64-10.64 9.5zm16.4-9.5L16.46 12l3.12-3.12-10.72-6.26C8.57 2.38 8.17 2.26 7.76 2.26c-.4 0-.8.12-1.12.32-.63.37-1 1.03-1 1.74v15.36c0 .71.37 1.37 1 1.74.32.2.72.32 1.12.32.41 0 .81-.12 1.12-.34l10.7-6.14z"/>
                </svg>
                <div>
                  <p className="text-[10px] text-[var(--muted)]">Доступно в</p>
                  <p className="text-xs font-semibold text-[var(--text)]">Google Play</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
