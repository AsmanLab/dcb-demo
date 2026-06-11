'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product3DIcon } from './Product3DIcon';
import { Section } from './Section';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

type FilterKey = 'all' | 'credit' | 'deposit' | 'card' | 'business';

const products: { nameKey: DictKey; descKey: DictKey; icon: React.ReactNode; filter: FilterKey }[] = [
  {
    nameKey: 'product.credits.name',
    descKey: 'product.credits.desc',
    filter: 'credit',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    nameKey: 'product.deposits.name',
    descKey: 'product.deposits.desc',
    filter: 'deposit',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    nameKey: 'product.cards.name',
    descKey: 'product.cards.desc',
    filter: 'card',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
  },
  {
    nameKey: 'product.transfers.name',
    descKey: 'product.transfers.desc',
    filter: 'card',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
        <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
  },
  {
    nameKey: 'product.business.name',
    descKey: 'product.business.desc',
    filter: 'business',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    nameKey: 'product.qr.name',
    descKey: 'product.qr.desc',
    filter: 'card',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/>
        <line x1="14" y1="14" x2="14" y2="14"/><line x1="20" y1="14" x2="20" y2="14"/>
        <line x1="14" y1="20" x2="20" y2="20"/>
      </svg>
    ),
  },
];

const filters: { id: FilterKey; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'credit', label: 'Кредиты' },
  { id: 'deposit', label: 'Депозиты' },
  { id: 'card', label: 'Карты' },
  { id: 'business', label: 'Бизнес' },
];

export function Products() {
  const t = useT();
  const [active, setActive] = useState<FilterKey>('all');

  const visible = active === 'all' ? products : products.filter(p => p.filter === active);

  return (
    <Section id="products" className="py-14 sm:py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)] mb-3">
            {t('products.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg">{t('products.subtitle')}</p>
        </motion.div>

        {/* Pill filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              aria-pressed={active === id}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === id
                  ? 'bg-brand text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map(({ nameKey, descKey, icon }, i) => (
            <motion.article
              key={nameKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-brand/30 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <Product3DIcon icon={icon} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[var(--text)] mb-1.5 text-base">{t(nameKey)}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{t(descKey)}</p>
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-[var(--border)] text-sm font-semibold text-[var(--text)] group-hover:border-brand group-hover:text-brand transition-colors">
                    {t('products.more')}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
