'use client';
import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard, type ProductCardData } from '@/components/ProductCard';
import { useT } from '@/components/providers';
import {
  LOAN_PRODUCTS, CARD_PRODUCTS, BUSINESS_SERVICES, TRANSFER_SYSTEMS, type Localized,
} from '@/lib/data';
import { dict } from '@/lib/i18n';

const plain = (s: string): Localized => ({ ru: s, kg: s, en: s });
const join = (a: Localized, b: string): Localized => ({ ru: `${a.ru} · ${b}`, kg: `${a.kg} · ${b}`, en: `${a.en} · ${b}` });

const CTA_APPLY: Localized = { ru: 'Оформить', kg: 'Тариздөө', en: 'Apply' };
const CTA_CARD: Localized = { ru: 'Оформить карту', kg: 'Карта тариздөө', en: 'Get the Card' };
const CTA_OPEN: Localized = { ru: 'Открыть', kg: 'Ачуу', en: 'Open' };

// ── Кредиты ──────────────────────────────────────────────────────────────
const loanImage: Record<string, string> = {
  consumer: '/products/cash.svg', fast: '/products/fast.svg', business: '/products/business-loan.svg',
  mobile: '/products/mobile.svg', mortgage: '/products/mortgage.svg', eco: '/products/eco.svg',
};
const loanTint: Record<string, string> = {
  consumer: 'rgba(255,138,30,0.16)', fast: 'rgba(228,0,43,0.14)', business: 'rgba(91,141,239,0.16)',
  mobile: 'rgba(228,0,43,0.14)', mortgage: 'rgba(45,212,191,0.16)', eco: 'rgba(14,159,88,0.16)',
};
const loanCards: ProductCardData[] = LOAN_PRODUCTS.map(l => ({
  id: l.id, name: l.name, desc: l.desc, badge: l.badge, cta: CTA_APPLY,
  image: loanImage[l.id], tint: loanTint[l.id] ?? 'rgba(228,0,43,0.14)', action: { type: 'apply' },
}));

// ── Карты ────────────────────────────────────────────────────────────────
const cardImage: Record<string, string> = {
  elcart: '/products/card.svg', pension: '/products/card-pension.svg',
  social: '/products/card-social.svg', kids: '/products/card-kids.svg',
};
const cardTint: Record<string, string> = {
  elcart: 'rgba(228,0,43,0.30)', pension: 'rgba(14,159,88,0.16)',
  social: 'rgba(91,141,239,0.16)', kids: 'rgba(228,87,126,0.18)',
};
const cardCards: ProductCardData[] = CARD_PRODUCTS.map(c => ({
  id: c.id, name: c.name, desc: c.desc, badge: c.fee,
  cta: c.id === 'elcart' ? CTA_CARD : CTA_APPLY,
  image: cardImage[c.id] ?? '/products/card.svg',
  highlight: c.id === 'elcart',
  tint: cardTint[c.id] ?? 'rgba(228,0,43,0.14)', action: { type: 'apply' },
}));

// ── Депозиты ─────────────────────────────────────────────────────────────
const depositCards: ProductCardData[] = [
  { id: 'baybol', name: dict['deposits.baybol.name'], desc: dict['deposits.baybol.desc'], badge: dict['deposits.baybol.rate'], cta: CTA_OPEN, image: '/products/deposit.svg', tint: 'rgba(243,146,0,0.16)', action: { type: 'apply' } },
  { id: 'baybols', name: dict['deposits.baybols.name'], desc: dict['deposits.baybols.desc'], badge: dict['deposits.baybols.rate'], cta: CTA_OPEN, image: '/products/deposit-plus.svg', tint: 'rgba(52,199,123,0.16)', action: { type: 'apply' } },
  { id: 'green', name: dict['deposits.green.name'], desc: dict['deposits.green.desc'], badge: dict['deposits.green.rate'], cta: CTA_OPEN, image: '/products/deposit-green.svg', tint: 'rgba(14,159,88,0.16)', action: { type: 'apply' } },
];

// ── Бизнесу ──────────────────────────────────────────────────────────────
const businessImage: Record<string, string> = {
  rko: '/products/account.svg', qr: '/products/business.svg',
  overdraft: '/products/business-loan.svg', guarantee: '/products/guarantee.svg',
};
const businessTint: Record<string, string> = {
  rko: 'rgba(91,141,239,0.16)', qr: 'rgba(160,107,255,0.16)',
  overdraft: 'rgba(91,141,239,0.16)', guarantee: 'rgba(160,107,255,0.18)',
};
const businessCards: ProductCardData[] = BUSINESS_SERVICES.map(b => ({
  id: b.id, name: b.name, desc: b.desc, badge: b.highlight, cta: CTA_APPLY,
  image: businessImage[b.id] ?? '/products/business.svg',
  tint: businessTint[b.id] ?? 'rgba(160,107,255,0.16)', action: { type: 'apply' },
}));

// ── Переводы ─────────────────────────────────────────────────────────────
const transferImage = (name: string) =>
  name === 'Золотая Корона' ? '/products/transfer-crown.svg' : '/products/transfer-globe.svg';
const transferCards: ProductCardData[] = TRANSFER_SYSTEMS.map(s => ({
  id: s.name, name: plain(s.name), desc: join(s.coverage, s.currencies), cta: CTA_OPEN,
  image: transferImage(s.name),
  tint: s.name === 'Золотая Корона' ? 'rgba(243,146,0,0.16)' : 'rgba(45,212,191,0.16)',
  action: { type: 'apply' },
}));

function Category({ title, cards }: { title: string; cards: ProductCardData[] }) {
  return (
    <section className="mb-14">
      <h2 className="font-display text-2xl font-extrabold text-[var(--text)] mb-5">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map(data => <ProductCard key={data.id} data={data} />)}
      </div>
    </section>
  );
}

export default function ProductsCatalogPage() {
  const t = useT();

  return (
    <main>
      <Header />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--muted)] hover:text-brand transition-colors mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t('catalog.back')}
        </Link>

        <h1 className="font-display text-[2rem] sm:text-[2.6rem] font-extrabold text-[var(--text)] mb-3">{t('catalog.title')}</h1>
        <p className="text-[var(--muted)] text-lg mb-12">{t('catalog.subtitle')}</p>

        <Category title={t('nav.credits')} cards={loanCards} />
        <Category title={t('nav.cards')} cards={cardCards} />
        <Category title={t('nav.deposits')} cards={depositCards} />
        <Category title={t('nav.business')} cards={businessCards} />
        <Category title={t('nav.transfers')} cards={transferCards} />
      </div>
      <Footer />
    </main>
  );
}
