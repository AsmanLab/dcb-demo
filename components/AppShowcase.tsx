'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

const features: { key: DictKey }[] = [
  { key: 'app.feature1' },
  { key: 'app.feature2' },
  { key: 'app.feature3' },
  { key: 'app.feature4' },
] as const;

export function AppShowcase() {
  const t = useT();

  return (
    <Section id="app" className="py-14 sm:py-20 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big brand-red card — Bakai pattern */}
        <div className="rounded-3xl bg-brand overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            {/* Left: phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-end px-10 pt-10 pb-0 lg:pb-0"
            >
              <div className="w-52 h-[340px] rounded-[2rem] bg-white border-4 border-white/20 overflow-hidden flex flex-col shadow-lg">
                {/* Status bar */}
                <div className="h-6 bg-white flex items-center justify-between px-4 pt-1">
                  <span className="text-[9px] font-semibold text-[#12141B]">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-1.5 rounded-sm bg-[#12141B]/40" />
                    <div className="w-1 h-1.5 rounded-sm bg-brand" />
                  </div>
                </div>
                <div className="flex-1 px-3 py-2 bg-[#F4F5F7] overflow-hidden">
                  <div className="rounded-xl p-3 mb-2 bg-brand">
                    <p className="text-white/70 text-[9px] mb-0.5">Баланс</p>
                    <p className="text-white font-bold text-sm">287 450 сом</p>
                    <p className="text-white/60 text-[9px] mt-0.5">•••• 4892</p>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {['↗', '⚡', '⊞', '···'].map((icon, i) => (
                      <div key={i} className="w-full aspect-square rounded-lg bg-white flex items-center justify-center text-xs text-[#12141B]">{icon}</div>
                    ))}
                  </div>
                  {[
                    { name: 'Перевод Айбек', amount: '-5 000', neg: true },
                    { name: 'Зарплата', amount: '+150 000', neg: false },
                    { name: 'Starbucks', amount: '-380', neg: true },
                  ].map((tx, i) => (
                    <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#E7E9EE] last:border-0">
                      <p className="text-[9px] text-[#12141B]">{tx.name}</p>
                      <p className={`text-[9px] font-semibold ${tx.neg ? 'text-red-600' : 'text-emerald-700'}`}>{tx.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: copy */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="px-8 sm:px-12 py-12 space-y-6"
            >
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/30 text-white/80 text-xs font-semibold mb-4">
                  DCB 360 · Simbank
                </span>
                <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-white mb-3">
                  {t('app.title')}
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">{t('app.subtitle')}</p>
              </div>

              <ul className="space-y-3" role="list">
                {features.map(({ key }) => (
                  <li key={key} className="flex items-center gap-3 text-white">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <p className="text-[10px] text-white/70">Загрузить в</p>
                    <p className="text-xs font-semibold text-white">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  aria-label="Скачать в Google Play"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M3.18 23.76c.31.17.65.24 1 .22l12.28-7.08-2.64-2.64-10.64 9.5zm16.4-9.5L16.46 12l3.12-3.12-10.72-6.26C8.57 2.38 8.17 2.26 7.76 2.26c-.4 0-.8.12-1.12.32-.63.37-1 1.03-1 1.74v15.36c0 .71.37 1.37 1 1.74.32.2.72.32 1.12.32.41 0 .81-.12 1.12-.34l10.7-6.14z"/>
                  </svg>
                  <div>
                    <p className="text-[10px] text-white/70">Доступно в</p>
                    <p className="text-xs font-semibold text-white">Google Play</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
