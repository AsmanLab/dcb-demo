'use client';
import React from 'react';
import { CURRENCY_RATES } from '@/lib/data';
import { useT } from './providers';

export function CurrencyTicker() {
  const t = useT();

  return (
    <div className="w-full bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <span className="flex-shrink-0 text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
          {t('hero.ticker.label')}
        </span>
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none flex-1">
          {CURRENCY_RATES.map((rate) => (
            <div key={rate.code} className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-bold text-[var(--text)]">{rate.flag} {rate.code}</span>
              <span className="text-xs font-semibold text-brand">▲ {rate.buy.toFixed(rate.code === 'KZT' ? 3 : 2)}</span>
              <span className="text-xs text-[var(--muted)]">/ {rate.sell.toFixed(rate.code === 'KZT' ? 3 : 2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
