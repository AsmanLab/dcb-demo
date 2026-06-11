'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Lang } from '@/lib/i18n';
import { dict } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n';

// ── Theme ──────────────────────────────────────────────────────────────────
type Theme = 'dark' | 'light';
interface ThemeCtx { theme: Theme; toggle: () => void; }
const ThemeContext = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} });

export function useTheme() { return useContext(ThemeContext); }

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('dcb-theme') as Theme | null;
    const initial = saved === 'dark' ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

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
  const [lang, setLangState] = useState<Lang>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('dcb-lang') as Lang | null;
    if (saved === 'ru' || saved === 'kg' || saved === 'en') setLangState(saved);
  }, []);

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
