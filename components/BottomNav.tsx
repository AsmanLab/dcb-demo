'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

type TabId = 'home' | 'products' | 'credit' | 'map';

interface Tab {
  id: TabId;
  labelKey: DictKey;
  target?: string; // section id to scroll to; absent = top
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: 'home',
    labelKey: 'bottom.home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9.5 21v-6h5v6" />
      </svg>
    ),
  },
  {
    id: 'products',
    labelKey: 'bottom.products',
    target: 'products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'credit',
    labelKey: 'bottom.calc',
    target: 'credit',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2.5" /><line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="11" x2="8" y2="11" /><line x1="12" y1="11" x2="12" y2="11" /><line x1="16" y1="11" x2="16" y2="11" />
        <line x1="8" y1="15" x2="8" y2="15" /><line x1="12" y1="15" x2="12" y2="15" /><line x1="16" y1="15" x2="16" y2="18" />
      </svg>
    ),
  },
  {
    id: 'map',
    labelKey: 'bottom.branches',
    target: 'map',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function BottomNav() {
  const t = useT();
  const [active, setActive] = useState<TabId>('home');

  // Scroll-spy: highlight the tab whose section is in view.
  useEffect(() => {
    const sections = tabs.filter(tab => tab.target);
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const tab = sections.find(s => s.target === visible.target.id);
          if (tab) setActive(tab.id);
        } else if (window.scrollY < 200) {
          setActive('home');
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach(tab => {
      const el = document.getElementById(tab.target!);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (window.scrollY < 200) setActive('home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleTap = (tab: Tab) => {
    if (tab.target) {
      setActive(tab.id);
      scrollToSection(tab.target);
    } else {
      setActive('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--bg)]/95 backdrop-blur-lg border-t border-[var(--border)] shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.18)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-label="Мобильная навигация"
    >
      <ul className="flex items-stretch justify-around px-1">
        {tabs.map(tab => {
          const isActive = active === tab.id;
          return (
            <li key={tab.id} className="flex-1">
              <button
                onClick={() => handleTap(tab)}
                aria-current={isActive ? 'page' : undefined}
                className="relative w-full flex flex-col items-center gap-1 pt-2.5 pb-2 px-1 transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="bottomnav-active"
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-brand"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`w-7 h-7 transition-colors ${isActive ? 'text-brand' : 'text-[var(--muted)]'}`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`text-[11px] font-semibold leading-none transition-colors ${
                    isActive ? 'text-brand' : 'text-[var(--muted)]'
                  }`}
                >
                  {t(tab.labelKey)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
