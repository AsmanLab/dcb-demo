'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import { ProductCard, type ProductCardData } from './ProductCard';
import { LOAN_PRODUCTS } from '@/lib/data';

const loan = (id: string) => LOAN_PRODUCTS.find(l => l.id === id)!;

const CTA_APPLY = { ru: 'Оформить', kg: 'Тариздөө', en: 'Apply' };
const CTA_CALC = { ru: 'Рассчитать', kg: 'Эсептөө', en: 'Calculate' };
const CTA_MORE = { ru: 'Подробнее', kg: 'Толугураак', en: 'Learn more' };

// Recommended = the core credit/card lineup. Offer-style products (deposit,
// QR/POS, transfers) live in the Special Offers scroller instead.
const cards: (ProductCardData & { span: string })[] = [
  {
    id: 'consumer', name: loan('consumer').name, desc: loan('consumer').desc, badge: loan('consumer').badge,
    cta: CTA_CALC, image: '/products/cash.svg', span: 'lg:col-span-3',
    tint: 'rgba(255,138,30,0.16)', action: { type: 'scroll', target: 'credit' },
  },
  {
    id: 'card', highlight: true,
    name: { ru: 'Карта «Элкарт DCB»', kg: '«Элкарт DCB» картасы', en: '"Elcart DCB" Card' },
    desc: { ru: 'До 2 карт на счёт, QR-оплата и бесконтакт. Выпуск 7–14 дней.', kg: 'Эсепке 2 картага чейин, QR жана байланышсыз төлөм. Чыгаруу 7–14 күн.', en: 'Up to 2 cards per account, QR and contactless. Issued in 7–14 days.' },
    cta: { ru: 'Оформить карту', kg: 'Карта тариздөө', en: 'Get the Card' },
    image: '/products/card.svg', span: 'lg:col-span-3', tint: 'rgba(228,0,43,0.30)', action: { type: 'apply' },
  },
  {
    id: 'fast', name: loan('fast').name, desc: loan('fast').desc, cta: CTA_APPLY,
    image: '/products/fast.svg', span: 'lg:col-span-2', tint: 'rgba(228,0,43,0.14)', action: { type: 'apply' },
  },
  {
    id: 'business', name: loan('business').name, desc: loan('business').desc, cta: CTA_APPLY,
    image: '/products/business-loan.svg', span: 'lg:col-span-2', tint: 'rgba(91,141,239,0.16)', action: { type: 'apply' },
  },
  {
    id: 'mobile', name: loan('mobile').name, desc: loan('mobile').desc, cta: CTA_APPLY,
    image: '/products/mobile.svg', span: 'lg:col-span-2', tint: 'rgba(228,0,43,0.14)', action: { type: 'apply' },
  },
  {
    id: 'mortgage', name: loan('mortgage').name, desc: loan('mortgage').desc, cta: CTA_APPLY,
    image: '/products/mortgage.svg', span: 'lg:col-span-2', tint: 'rgba(45,212,191,0.16)', action: { type: 'apply' },
  },
  {
    id: 'eco', name: loan('eco').name, desc: loan('eco').desc, badge: loan('eco').badge, cta: CTA_MORE,
    image: '/products/eco.svg', span: 'lg:col-span-2', tint: 'rgba(14,159,88,0.16)', action: { type: 'scroll', target: 'green' },
  },
];

export function FeaturedProducts() {
  const t = useT();

  return (
    <Section id="products" className="py-14 sm:py-20 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)] text-center mb-10"
        >
          {t('feat.title')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {cards.map(({ span, ...data }) => (
            <div key={data.id} className={span}>
              <ProductCard data={data} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
          >
            {t('feat.all')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}
