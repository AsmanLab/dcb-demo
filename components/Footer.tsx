'use client';
import React, { useState } from 'react';
import { SailLogo } from './SailLogo';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

const col1: { labelKey: DictKey; href: string }[] = [
  { labelKey: 'nav.credits', href: '#products' },
  { labelKey: 'nav.deposits', href: '#deposits' },
  { labelKey: 'nav.cards', href: '#products' },
  { labelKey: 'nav.transfers', href: '#products' },
  { labelKey: 'nav.business', href: '#products' },
];

const col2: { labelKey: DictKey; href: string }[] = [
  { labelKey: 'footer.about', href: '#' },
  { labelKey: 'footer.careers', href: '#' },
  { labelKey: 'footer.news', href: '#' },
];

const col3: { labelKey: DictKey; href: string }[] = [
  { labelKey: 'footer.faq', href: '#' },
  { labelKey: 'footer.chat', href: '#' },
  { labelKey: 'footer.complaint', href: '#' },
];

function AccordionSection({ title, items, t }: { title: string; items: { labelKey: DictKey; href: string }[]; t: (k: DictKey) => string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)] sm:border-0">
      <button
        className="w-full flex items-center justify-between py-4 sm:py-0 sm:cursor-default text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-bold text-[var(--text)]">{title}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          className={`sm:hidden transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      <ul className={`space-y-2 mb-4 sm:block ${open ? 'block' : 'hidden'}`} role="list">
        {items.map(({ labelKey, href }) => (
          <li key={labelKey}>
            <a href={href} className="text-sm text-[var(--muted)] hover:text-brand transition-colors">{t(labelKey)}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const t = useT();

  return (
    <footer className="bg-[var(--bg)] border-t border-[var(--border)]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0 sm:gap-8 mb-10">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4 pb-6 sm:pb-0">
            <a href="#" className="flex items-center gap-2.5" aria-label="Дос-Кредобанк">
              <SailLogo size={30} />
              <span className="font-display font-bold text-xs tracking-widest uppercase text-[var(--text)]">DOSCREDOBANK</span>
            </a>
            <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
              {t('hero.slogan')}
            </p>
            <address className="not-italic space-y-1.5">
              <p className="text-sm text-[var(--muted)]">Бишкек, проспект Чуй 92</p>
              <a href="mailto:office@doscredobank.kg" className="text-sm text-[var(--muted)] hover:text-brand transition-colors block">
                office@doscredobank.kg
              </a>
              <a href="tel:8686" className="text-sm font-bold text-[var(--text)] hover:text-brand transition-colors block">
                8686 — для всех клиентов (бесплатно)
              </a>
            </address>
          </div>

          {/* Accordion columns */}
          <div className="sm:col-span-1">
            <AccordionSection title={t('footer.products')} items={col1} t={t} />
          </div>
          <div className="sm:col-span-1">
            <AccordionSection title={t('footer.bank')} items={col2} t={t} />
          </div>
          <div className="sm:col-span-1">
            <AccordionSection title={t('footer.support')} items={col3} t={t} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted)] text-center sm:text-left">
            © 2026 ОАО «Дос-Кредобанк». Лицензия НБ КР №037. Демо — APRD Agency
          </p>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold">
            DEMO · APRD
          </span>
        </div>
      </div>
    </footer>
  );
}
