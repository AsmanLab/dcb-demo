'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

const deposits: { nameKey: DictKey; rateKey: DictKey; descKey: DictKey; highlight: boolean }[] = [
  {
    nameKey: 'deposits.baybol.name',
    rateKey: 'deposits.baybol.rate',
    descKey: 'deposits.baybol.desc',
    highlight: true,
  },
  {
    nameKey: 'deposits.baybols.name',
    rateKey: 'deposits.baybols.rate',
    descKey: 'deposits.baybols.desc',
    highlight: false,
  },
  {
    nameKey: 'deposits.green.name',
    rateKey: 'deposits.green.rate',
    descKey: 'deposits.green.desc',
    highlight: false,
  },
];

export function Deposits() {
  const t = useT();

  return (
    <Section id="deposits" className="py-14 sm:py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)] mb-3">
            {t('deposits.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg">{t('deposits.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {deposits.map(({ nameKey, rateKey, descKey, highlight }, i) => (
            <motion.div
              key={nameKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl p-7 border transition-all bg-[var(--surface-2)] ${
                highlight ? 'border-brand/30' : 'border-[var(--border)]'
              }`}
            >
              {highlight && (
                <span className="absolute top-5 right-5 px-2.5 py-0.5 rounded-full bg-brand text-white text-xs font-bold">
                  ТОП
                </span>
              )}

              {/* Rate */}
              <div className="mb-4">
                <span className="font-display text-3xl font-extrabold text-brand">
                  {t(rateKey)}
                </span>
                <span className="text-sm text-[var(--muted)] ml-1">годовых</span>
              </div>

              <h3 className="font-display text-xl font-bold text-[var(--text)] mb-2">{t(nameKey)}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">{t(descKey)}</p>

              <button className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${
                highlight
                  ? 'bg-brand hover:bg-brand-600 text-white'
                  : 'border border-[var(--border)] hover:border-[var(--text)] text-[var(--text)]'
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
