'use client';
import React from 'react';
import { useLang } from './providers';
import type { Lang } from '@/lib/i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'kg', label: 'KG' },
  { code: 'en', label: 'EN' },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-0.5 bg-white/5 rounded-full px-1 py-0.5" role="group" aria-label="Выбор языка">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-label={`Язык: ${label}`}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
            lang === code
              ? 'bg-brand text-white shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--text)]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
