'use client';
import React, { useState } from 'react';
import { SailLogo } from './SailLogo';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

// Mirrors the real dcb.kg footer: Клиентам / О банке / Обратная связь
const col1: { labelKey: DictKey; href: string }[] = [
  { labelKey: 'map.filter.branches', href: '#map' },
  { labelKey: 'map.filter.atm', href: '#map' },
  { labelKey: 'footer.tariffs', href: '#' },
  { labelKey: 'footer.requisites', href: '#' },
  { labelKey: 'footer.guarantees', href: '#products' },
  { labelKey: 'footer.security', href: '#' },
  { labelKey: 'footer.literacy', href: '#' },
];

const col2: { labelKey: DictKey; href: string }[] = [
  { labelKey: 'footer.about', href: '#' },
  { labelKey: 'footer.awards', href: '#' },
  { labelKey: 'footer.reports', href: '#' },
  { labelKey: 'footer.management', href: '#' },
  { labelKey: 'footer.careers', href: '#' },
  { labelKey: 'footer.news', href: '#news' },
];

const col3: { labelKey: DictKey; href: string }[] = [
  { labelKey: 'footer.quality', href: '#' },
  { labelKey: 'footer.complaint', href: '#' },
  { labelKey: 'footer.chat', href: '#' },
  { labelKey: 'footer.faq', href: '#faq' },
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
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/doscredobank.kg" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] hover:text-brand transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/doscredobank_kg" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] hover:text-brand transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://twitter.com/doscredobank_kg" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                 className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] hover:text-brand transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Accordion columns */}
          <div className="sm:col-span-1">
            <AccordionSection title={t('footer.clients')} items={col1} t={t} />
          </div>
          <div className="sm:col-span-1">
            <AccordionSection title={t('footer.bank')} items={col2} t={t} />
          </div>
          <div className="sm:col-span-1">
            <AccordionSection title={t('footer.feedback')} items={col3} t={t} />
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
