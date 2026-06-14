'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT, useLang } from './providers';
import { openApplication } from '@/lib/apply';
import { LOAN_PRODUCTS, type Localized } from '@/lib/data';

type Action = { type: 'scroll'; target: string } | { type: 'apply' };

interface Card {
  id: string;
  name: Localized;
  desc: Localized;
  cta: Localized;
  badge?: Localized;
  image: string;
  span: string;       // lg column span
  highlight?: boolean;
  tint: string;       // soft glow color
  action: Action;
}

const loan = (id: string) => LOAN_PRODUCTS.find(l => l.id === id)!;

const CTA_APPLY: Localized = { ru: 'Оформить', kg: 'Тариздөө', en: 'Apply' };
const CTA_CALC: Localized = { ru: 'Рассчитать', kg: 'Эсептөө', en: 'Calculate' };
const CTA_MORE: Localized = { ru: 'Подробнее', kg: 'Толугураак', en: 'Learn more' };

const cards: Card[] = [
  // Flagship highlights (row 1)
  {
    id: 'consumer',
    name: loan('consumer').name, desc: loan('consumer').desc, badge: loan('consumer').badge,
    cta: CTA_CALC, image: '/products/cash.svg', span: 'lg:col-span-3', highlight: false,
    tint: 'rgba(255,138,30,0.16)', action: { type: 'scroll', target: 'credit' },
  },
  {
    id: 'card',
    name: { ru: 'Карта «Элкарт DCB»', kg: '«Элкарт DCB» картасы', en: '"Elcart DCB" Card' },
    desc: { ru: 'До 2 карт на счёт, QR-оплата и бесконтакт. Выпуск 7–14 дней.', kg: 'Эсепке 2 картага чейин, QR жана байланышсыз төлөм. Чыгаруу 7–14 күн.', en: 'Up to 2 cards per account, QR and contactless. Issued in 7–14 days.' },
    cta: { ru: 'Оформить карту', kg: 'Карта тариздөө', en: 'Get the Card' },
    image: '/products/card.svg', span: 'lg:col-span-3', highlight: true,
    tint: 'rgba(228,0,43,0.30)', action: { type: 'apply' },
  },

  // Loan lineup (from the products tab)
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

  // Other flagships
  {
    id: 'deposit',
    name: { ru: 'Депозит «Бай Бол»', kg: '«Бай Бол» аманаты', en: '"Bai Bol" Deposit' },
    desc: { ru: 'До 14% годовых. Акция до 31.07.2026. Вклады застрахованы.', kg: 'Жылдык 14%га чейин. Акция 31.07.2026га чейин. Аманаттар камсыздандырылган.', en: 'Up to 14% p.a. Promo until 31.07.2026. Deposits insured.' },
    cta: { ru: 'Открыть вклад', kg: 'Аманат ачуу', en: 'Open a Deposit' },
    image: '/products/deposit.svg', span: 'lg:col-span-2', tint: 'rgba(243,146,0,0.16)', action: { type: 'apply' },
  },
  {
    id: 'transfers',
    name: { ru: 'Переводы', kg: 'Которуулар', en: 'Transfers' },
    desc: { ru: 'Золотая Корона, SWIFT и переводы в Китай на WeChat.', kg: 'Золотая Корона, SWIFT жана Кытайга WeChat которуулар.', en: 'Golden Crown, SWIFT and WeChat transfers to China.' },
    cta: { ru: 'Отправить', kg: 'Жөнөтүү', en: 'Send' },
    image: '/products/transfers.svg', span: 'lg:col-span-2', tint: 'rgba(45,212,191,0.16)', action: { type: 'apply' },
  },
  {
    id: 'biz',
    name: { ru: 'Бизнесу', kg: 'Бизнеске', en: 'For Business' },
    desc: { ru: 'РКО — счёт от 15 минут. QR и POS-терминалы за 0 сом.', kg: 'РКО — эсеп 15 мүнөттөн. QR жана POS-терминалдар 0 сом.', en: 'Settlement account in 15 min. QR & POS terminals for 0 KGS.' },
    cta: { ru: 'Открыть счёт', kg: 'Эсеп ачуу', en: 'Open an Account' },
    image: '/products/business.svg', span: 'lg:col-span-2', tint: 'rgba(160,107,255,0.16)', action: { type: 'apply' },
  },
];

function ProductCard({ card }: { card: Card }) {
  const { lang } = useLang();
  const run = () => {
    if (card.action.type === 'apply') openApplication(card.name[lang]);
    else document.getElementById(card.action.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`group relative overflow-hidden rounded-3xl p-6 sm:p-7 min-h-[19rem] flex flex-col ${card.span} ${
        card.highlight ? 'bg-[#14161D] text-white' : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]'
      }`}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-10 w-56 h-56 rounded-full blur-3xl"
        style={{ background: card.tint }}
        aria-hidden="true"
      />

      <div className="relative text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className={`font-display text-xl font-extrabold ${card.highlight ? 'text-white' : 'text-[var(--text)]'}`}>
            {card.name[lang]}
          </h3>
          {card.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-bold whitespace-nowrap">
              {card.badge[lang]}
            </span>
          )}
        </div>
        <p className={`text-sm leading-relaxed mx-auto max-w-[22rem] ${card.highlight ? 'text-white/70' : 'text-[var(--muted)]'}`}>
          {card.desc[lang]}
        </p>
      </div>

      <div className="relative flex-1 mt-3 min-h-[8rem]">
        <Image
          src={card.image}
          alt=""
          fill
          unoptimized
          aria-hidden="true"
          className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <button
        onClick={run}
        className={`relative self-start z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
          card.highlight
            ? 'bg-white text-[#14161D] hover:bg-white/90'
            : 'bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:border-brand hover:text-brand shadow-sm'
        }`}
      >
        {card.cta[lang]}
      </button>
    </motion.article>
  );
}

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
          {cards.map(card => (
            <ProductCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </Section>
  );
}
