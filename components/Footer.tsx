'use client';
import React from 'react';
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

export function Footer() {
  const t = useT();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5" aria-label="Дос-Кредобанк">
              <SailLogo size={30} />
              <span className="font-display font-bold text-xs tracking-widest uppercase text-[var(--text)]">DOSCREDOBANK</span>
            </a>
            <p className="text-sm text-[var(--muted)] max-w-xs leading-relaxed">
              {t('hero.slogan')}
            </p>
            <address className="not-italic space-y-1">
              <p className="text-sm text-[var(--muted)]">📍 {t('footer.address')}</p>
              <a href="mailto:office@doscredobank.kg" className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors block">
                ✉️ {t('footer.email')}
              </a>
              <a href="tel:8686" className="text-sm font-semibold text-brand hover:text-brand-400 transition-colors block">
                📞 8686
              </a>
            </address>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2" role="list">
              {col1.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a href={href} className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">{t(labelKey)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bank */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] mb-4">{t('footer.bank')}</h3>
            <ul className="space-y-2" role="list">
              {col2.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a href={href} className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">{t(labelKey)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text)] mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2" role="list">
              {col3.map(({ labelKey, href }) => (
                <li key={labelKey}>
                  <a href={href} className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">{t(labelKey)}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)] text-center sm:text-left">{t('footer.copy')}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--muted)]">{t('footer.license')}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] font-bold">
              DEMO · APRD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
