'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

const ecoItems: { key: DictKey; rate: string }[] = [
  { key: 'green.eco.home', rate: 'от 14%' },
  { key: 'green.eco.car', rate: 'от 15%' },
  { key: 'green.eco.agro', rate: 'от 13%' },
  { key: 'green.eco.tourism', rate: 'от 16%' },
] as const;

export function GreenBanking() {
  const t = useT();

  return (
    <Section id="green" className="py-14 sm:py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4">
            ESG Banking
          </span>
          <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)] mb-3">
            {t('green.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">{t('green.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Eco products grid */}
          <div className="grid grid-cols-2 gap-4">
            {ecoItems.map(({ key, rate }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-300 rounded-3xl p-6 transition-all"
              >
                <h3 className="font-bold text-[var(--text)] text-sm mb-2">{t(key)}</h3>
                <span className="text-sm font-bold text-emerald-700">{rate} годовых</span>
              </motion.div>
            ))}
          </div>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-[var(--muted)] text-base leading-relaxed">{t('green.desc')}</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--surface)] rounded-3xl p-5 border border-[var(--border)]">
                <p className="font-display text-2xl font-extrabold text-emerald-700 mb-0.5">4</p>
                <p className="text-sm text-[var(--muted)]">Эко-направления</p>
              </div>
              <div className="bg-[var(--surface)] rounded-3xl p-5 border border-[var(--border)]">
                <p className="font-display text-2xl font-extrabold text-emerald-700 mb-0.5">-2%</p>
                <p className="text-sm text-[var(--muted)]">Льготная ставка</p>
              </div>
            </div>

            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm transition-colors"
            >
              Зелёные продукты
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
