'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT, useLang } from './providers';
import { PROMOS } from '@/lib/data';

export function Promos() {
  const t = useT();
  const { lang } = useLang();

  return (
    <Section id="promos" className="py-14 sm:py-20 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-baseline justify-between gap-2 mb-8"
        >
          <div>
            <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)] mb-1">
              {t('promos.title')}
            </h2>
            <p className="text-[var(--muted)] text-lg">{t('promos.subtitle')}</p>
          </div>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto lg:overflow-visible pb-2 snap-x">
          {PROMOS.map((promo, i) => (
            <motion.a
              key={promo.id}
              href={promo.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex-shrink-0 w-[260px] lg:w-auto snap-start flex flex-col p-6 rounded-3xl bg-[var(--bg)] border border-[var(--border)] hover:border-brand/30 transition-all"
            >
              <span className="self-start px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-bold mb-4">
                {promo.tag[lang]}
              </span>
              <h3 className="font-bold text-[var(--text)] text-sm leading-snug mb-2 group-hover:text-brand transition-colors">
                {promo.title[lang]}
              </h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">{promo.desc[lang]}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
