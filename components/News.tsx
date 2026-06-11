'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT, useLang } from './providers';
import { NEWS_ITEMS } from '@/lib/data';

export function News() {
  const t = useT();
  const { lang } = useLang();

  return (
    <Section id="news" className="py-14 sm:py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-baseline justify-between gap-4 mb-8"
        >
          <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)]">
            {t('news.title')}
          </h2>
          <a href="#" className="text-sm font-semibold text-brand hover:underline whitespace-nowrap">
            {t('news.all')} →
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {NEWS_ITEMS.map((item, i) => (
            <motion.a
              key={item.date + i}
              href="#"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-start gap-4 p-5 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-brand/30 transition-all"
            >
              <time className="flex-shrink-0 text-xs font-bold text-[var(--muted)] pt-0.5">{item.date}</time>
              <span className="text-sm text-[var(--text)] leading-snug group-hover:text-brand transition-colors">
                {item.title[lang]}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
