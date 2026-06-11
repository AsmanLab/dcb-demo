'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import { BAYBOL_RATE_TABLE, DEPOSIT_MIN_AMOUNTS } from '@/lib/data';
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

        {/* «Бай Бол» rate table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto mt-10 rounded-3xl bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden"
        >
          <div className="px-6 pt-6 pb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display font-bold text-lg text-[var(--text)]">{t('deposits.table.title')}</h3>
            <span className="text-xs text-[var(--muted)]">{t('deposits.table.note')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
                  <th className="font-semibold px-6 py-3">{t('deposits.table.term')}</th>
                  {BAYBOL_RATE_TABLE.map((row) => (
                    <th key={row.term} className="font-semibold px-4 py-3 text-center whitespace-nowrap">{row.term}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-3 text-[var(--muted)] whitespace-nowrap">{t('deposits.table.rate')}</td>
                  {BAYBOL_RATE_TABLE.map((row) => (
                    <td
                      key={row.term}
                      className={`px-4 py-3 text-center font-bold whitespace-nowrap ${
                        row.rate === '14%' ? 'text-brand' : 'text-[var(--text)]'
                      }`}
                    >
                      {row.rate}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="px-6 py-4 text-xs text-[var(--muted)]">
            {t('deposits.min')}: {DEPOSIT_MIN_AMOUNTS}
          </p>
        </motion.div>

        {/* Insurance badge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-6 flex items-center justify-center gap-2 text-sm text-[var(--muted)] text-center"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 text-brand" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
          </svg>
          {t('deposits.insurance')}
        </motion.p>
      </div>
    </Section>
  );
}
