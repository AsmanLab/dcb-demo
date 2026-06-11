'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Section';
import { useT, useLang } from './providers';
import {
  LOAN_PRODUCTS,
  CONSUMER_LOAN_LADDER,
  CARD_PRODUCTS,
  TRANSFER_SYSTEMS,
  BUSINESS_SERVICES,
} from '@/lib/data';
import type { DictKey } from '@/lib/i18n';

type TabKey = 'credit' | 'card' | 'transfer' | 'business';

const tabs: { id: TabKey; labelKey: DictKey }[] = [
  { id: 'credit', labelKey: 'nav.credits' },
  { id: 'card', labelKey: 'nav.cards' },
  { id: 'transfer', labelKey: 'nav.transfers' },
  { id: 'business', labelKey: 'nav.business' },
];

function LoansTab() {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {LOAN_PRODUCTS.map((loan, i) => (
          <motion.article
            key={loan.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-brand/30 transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-bold text-[var(--text)] text-base">{loan.name[lang]}</h3>
              {loan.badge && (
                <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-bold">
                  {loan.badge[lang]}
                </span>
              )}
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{loan.desc[lang]}</p>
          </motion.article>
        ))}
      </div>

      {/* Consumer loan rate ladder */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.3 }}
        className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden"
      >
        <div className="px-6 pt-6 pb-3">
          <h3 className="font-display font-bold text-lg text-[var(--text)]">{t('loans.ladder.title')}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--muted)] border-b border-[var(--border)]">
                <th className="font-semibold px-6 py-3">{t('loans.ladder.amount')}</th>
                <th className="font-semibold px-6 py-3">{t('loans.ladder.rate')}</th>
                <th className="font-semibold px-6 py-3">{t('loans.ladder.term')}</th>
              </tr>
            </thead>
            <tbody>
              {CONSUMER_LOAN_LADDER.map((row) => (
                <tr key={row.amount} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-6 py-3 text-[var(--text)] font-medium whitespace-nowrap">{row.amount}</td>
                  <td className="px-6 py-3 text-brand font-bold whitespace-nowrap">{row.rate}</td>
                  <td className="px-6 py-3 text-[var(--muted)] whitespace-nowrap">{row.term}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-6 py-4 text-xs text-[var(--muted)]">{t('loans.note')}</p>
      </motion.div>
    </div>
  );
}

function CardsTab() {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CARD_PRODUCTS.map((card, i) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="p-6 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-brand/30 transition-all flex flex-col"
          >
            {/* Mini card visual */}
            <div className="w-full aspect-[1.6] rounded-2xl bg-gradient-to-br from-brand to-brand-600 mb-4 p-4 flex flex-col justify-between">
              <span className="text-white/80 text-[10px] font-bold tracking-widest uppercase">Doscredobank</span>
              <span className="text-white text-sm font-bold">{card.name[lang]}</span>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 flex-1">{card.desc[lang]}</p>
            <dl className="space-y-1.5 text-xs">
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--muted)]">{t('cards.fee')}</dt>
                <dd className="text-[var(--text)] font-semibold text-right">{card.fee[lang]}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[var(--muted)]">{t('cards.validity')}</dt>
                <dd className="text-[var(--text)] font-semibold text-right">{card.validity[lang]}</dd>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>
      <p className="text-center text-xs text-[var(--muted)]">{t('cards.issuance')}</p>
    </div>
  );
}

function TransfersTab() {
  const t = useT();
  const { lang } = useLang();

  return (
    <div className="space-y-6">
      {/* WeChat highlight */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl bg-gradient-to-r from-brand to-brand-600 p-6 sm:p-8 text-white flex items-center gap-4"
      >
        <span className="text-3xl" aria-hidden="true">🇨🇳</span>
        <div>
          <h3 className="font-display font-bold text-lg">{t('transfers.wechat')}</h3>
          <p className="text-white/80 text-sm">WeChat (Weixin)</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TRANSFER_SYSTEMS.map((sys, i) => (
          <motion.div
            key={sys.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            className="p-5 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-brand/30 transition-all"
          >
            <h3 className="font-bold text-[var(--text)] text-sm mb-1.5">{sys.name}</h3>
            <p className="text-xs text-[var(--muted)] mb-2">{sys.coverage[lang]}</p>
            <p className="text-xs font-semibold text-brand">{sys.currencies}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BusinessTab() {
  const { lang } = useLang();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {BUSINESS_SERVICES.map((svc, i) => (
        <motion.article
          key={svc.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          className="p-7 rounded-3xl bg-[var(--surface)] border border-[var(--border)] hover:border-brand/30 transition-all"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold mb-3">
            {svc.highlight[lang]}
          </span>
          <h3 className="font-bold text-[var(--text)] text-base mb-1.5">{svc.name[lang]}</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">{svc.desc[lang]}</p>
        </motion.article>
      ))}
    </div>
  );
}

export function Products() {
  const t = useT();
  const [active, setActive] = useState<TabKey>('credit');

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

        {/* Pill tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10" role="tablist">
          {tabs.map(({ id, labelKey }) => (
            <button
              key={id}
              role="tab"
              onClick={() => setActive(id)}
              aria-selected={active === id}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === id
                  ? 'bg-brand text-white'
                  : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {active === 'credit' && <LoansTab />}
            {active === 'card' && <CardsTab />}
            {active === 'transfer' && <TransfersTab />}
            {active === 'business' && <BusinessTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
