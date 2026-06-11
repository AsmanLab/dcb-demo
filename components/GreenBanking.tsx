'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

const ecoItems: { key: DictKey; icon: string; rate: string }[] = [
  { key: 'green.eco.home', icon: '🏠', rate: 'от 14%' },
  { key: 'green.eco.car', icon: '⚡', rate: 'от 15%' },
  { key: 'green.eco.agro', icon: '🌾', rate: 'от 13%' },
  { key: 'green.eco.tourism', icon: '🏔️', rate: 'от 16%' },
] as const;

export function GreenBanking() {
  const t = useT();

  return (
    <Section id="green" className="py-20 bg-[var(--bg)] relative overflow-hidden">
      {/* Subtle green accent bg */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            🌿 ESG Banking
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
            {t('green.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">{t('green.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Eco products grid */}
          <div className="grid grid-cols-2 gap-4">
            {ecoItems.map(({ key, icon, rate }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/30 rounded-2xl p-5 transition-all"
              >
                <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
                <h3 className="font-semibold text-[var(--text)] text-sm mb-1">{t(key)}</h3>
                <span className="text-xs font-bold text-emerald-400">{rate} годовых</span>
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--surface)] rounded-2xl p-4 border border-emerald-500/20">
                <p className="font-display text-2xl font-extrabold text-emerald-400 mb-0.5">4</p>
                <p className="text-xs text-[var(--muted)]">Эко-направления</p>
              </div>
              <div className="bg-[var(--surface)] rounded-2xl p-4 border border-emerald-500/20">
                <p className="font-display text-2xl font-extrabold text-emerald-400 mb-0.5">-2%</p>
                <p className="text-xs text-[var(--muted)]">Льготная ставка</p>
              </div>
            </div>

            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
            >
              🌱 Зелёные продукты
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
