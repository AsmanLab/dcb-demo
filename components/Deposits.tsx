'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

const deposits: { nameKey: DictKey; rateKey: DictKey; descKey: DictKey; highlight: boolean; color: string }[] = [
  {
    nameKey: 'deposits.baybol.name',
    rateKey: 'deposits.baybol.rate',
    descKey: 'deposits.baybol.desc',
    highlight: true,
    color: 'from-brand via-brand-600 to-brand-600',
  },
  {
    nameKey: 'deposits.baybols.name',
    rateKey: 'deposits.baybols.rate',
    descKey: 'deposits.baybols.desc',
    highlight: false,
    color: 'from-blue-600 to-blue-700',
  },
  {
    nameKey: 'deposits.green.name',
    rateKey: 'deposits.green.rate',
    descKey: 'deposits.green.desc',
    highlight: false,
    color: 'from-emerald-600 to-emerald-700',
  },
];

export function Deposits() {
  const t = useT();

  return (
    <Section id="deposits" className="py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
            {t('deposits.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg">{t('deposits.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {deposits.map(({ nameKey, rateKey, descKey, highlight, color }, i) => (
            <motion.div
              key={nameKey}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-7 border transition-all ${
                highlight
                  ? 'bg-[var(--surface)] border-brand/40 shadow-[0_0_40px_-10px_rgba(228,0,43,0.25)]'
                  : 'bg-[var(--surface)] border-[var(--border)]'
              }`}
            >
              {highlight && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-brand text-white text-xs font-bold">
                  ТОП
                </span>
              )}

              {/* Rate badge */}
              <div className={`inline-flex items-center px-4 py-2 rounded-2xl bg-gradient-to-r ${color} text-white font-display font-extrabold text-2xl mb-4`}>
                {t(rateKey)}
              </div>

              <h3 className="font-display text-xl font-bold text-[var(--text)] mb-2">{t(nameKey)}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">{t(descKey)}</p>

              <button className={`w-full py-3 rounded-2xl font-semibold text-sm transition-all ${
                highlight
                  ? 'bg-brand hover:bg-brand-600 text-white shadow-[0_6px_20px_-6px_rgba(228,0,43,0.5)]'
                  : 'border border-[var(--border)] text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`}>
                {t('deposits.open')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
