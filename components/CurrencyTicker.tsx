'use client';
import React, { useEffect, useState } from 'react';
import { CURRENCY_RATES, type CurrencyRate } from '@/lib/data';
import { useT } from './providers';

type Rate = Pick<CurrencyRate, 'code' | 'flag' | 'buy' | 'sell'>;

export function CurrencyTicker() {
  const t = useT();
  const [rates, setRates] = useState<readonly Rate[]>(CURRENCY_RATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/rates')
      .then(r => r.json())
      .then((data: { rates?: Rate[] }) => {
        if (active && Array.isArray(data.rates) && data.rates.length) setRates(data.rates);
      })
      .catch(() => { /* keep static fallback */ })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div className="w-full bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
        <span className="flex-shrink-0 text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
          {t('hero.ticker.label')}
        </span>
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none flex-1" aria-busy={loading}>
          {rates.map((rate) => (
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
