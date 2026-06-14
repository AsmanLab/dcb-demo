'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Lang } from '@/lib/i18n';
import { dict } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n';

// ── Theme ──────────────────────────────────────────────────────────────────
type Theme = 'dark' | 'light';
interface ThemeCtx { theme: Theme; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} });

export function useTheme() { return useContext(ThemeContext); }

function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The inline script in layout.tsx applies the `dark` class before hydration,
  // so we read the resolved theme from the DOM — no flash, no setState-in-effect.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    return 'light';
  });

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('dcb-theme', next);
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

// ── Language ───────────────────────────────────────────────────────────────
interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: (key: DictKey) => string; }
const LangContext = createContext<LangCtx>({ lang: 'ru', setLang: () => {}, t: () => '' });

export function useLang() { return useContext(LangContext); }
export function useT() { return useContext(LangContext).t; }

function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dcb-lang');
      if (saved === 'ru' || saved === 'kg' || saved === 'en') return saved;
    }
    return 'ru';
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem('dcb-lang', l);
  }, []);

  const t = useCallback((key: DictKey): string => {
    return dict[key]?.[lang] ?? key;
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

// ── Combined Providers ─────────────────────────────────────────────────────
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>{children}</LangProvider>
    </ThemeProvider>
  );
}
