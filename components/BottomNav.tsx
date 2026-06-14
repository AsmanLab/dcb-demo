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
  icon: (active: boolean) => React.ReactNode;
}

// Rounded, modern glyphs. Inactive = soft outline; active = filled silhouette
// (theme-aware cut-outs via fill="var(--bg)").
const svgProps = {
  viewBox: '0 0 24 24',
  width: '100%',
  height: '100%',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const tabs: Tab[] = [
  {
    id: 'home',
    labelKey: 'bottom.home',
    icon: (active) =>
      active ? (
        <svg {...svgProps} fill="currentColor" stroke="none">
          <path d="M10.7 3.1a2 2 0 0 1 2.6 0l7 6.05A2 2 0 0 1 21 10.66V19a2.5 2.5 0 0 1-2.5 2.5H15.5V16a3.5 3.5 0 0 0-7 0v5.5H5.5A2.5 2.5 0 0 1 3 19v-8.34a2 2 0 0 1 .7-1.51z" />
        </svg>
      ) : (
        <svg {...svgProps} fill="none" stroke="currentColor">
          <path d="M4 10.6a2 2 0 0 1 .7-1.52l6-5.2a2 2 0 0 1 2.6 0l6 5.2A2 2 0 0 1 20 10.6V19a2 2 0 0 1-2 2h-3v-5a3 3 0 0 0-6 0v5H6a2 2 0 0 1-2-2z" />
        </svg>
      ),
  },
  {
    id: 'products',
    labelKey: 'bottom.products',
    target: 'products',
    icon: (active) =>
      active ? (
        <svg {...svgProps} fill="currentColor" stroke="none">
          <rect x="3" y="3" width="8" height="8" rx="3" />
          <rect x="13" y="3" width="8" height="8" rx="3" />
          <rect x="3" y="13" width="8" height="8" rx="3" />
          <rect x="13" y="13" width="8" height="8" rx="3" />
        </svg>
      ) : (
        <svg {...svgProps} fill="none" stroke="currentColor">
          <rect x="3.5" y="3.5" width="7" height="7" rx="2.5" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="2.5" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="2.5" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="2.5" />
        </svg>
      ),
  },
  {
    id: 'credit',
    labelKey: 'bottom.calc',
    target: 'credit',
    icon: (active) =>
      active ? (
        <svg {...svgProps} fill="currentColor" stroke="none">
          <rect x="4" y="2.5" width="16" height="19" rx="4.5" />
          <rect x="7.5" y="5.5" width="9" height="3.5" rx="1.75" fill="var(--bg)" />
          <circle cx="9" cy="13" r="1.15" fill="var(--bg)" />
          <circle cx="12" cy="13" r="1.15" fill="var(--bg)" />
          <circle cx="15" cy="13" r="1.15" fill="var(--bg)" />
          <circle cx="9" cy="17" r="1.15" fill="var(--bg)" />
          <circle cx="12" cy="17" r="1.15" fill="var(--bg)" />
          <rect x="13.85" y="15.85" width="2.3" height="5" rx="1.15" fill="var(--bg)" />
        </svg>
      ) : (
        <svg {...svgProps} fill="none" stroke="currentColor">
          <rect x="4.5" y="3" width="15" height="18" rx="4" />
          <rect x="7.5" y="6" width="9" height="3" rx="1.5" />
          <path d="M9 13h0M12 13h0M15 13h0M9 17h0M12 17h0M15 16.5v1.5" />
        </svg>
      ),
  },
  {
    id: 'map',
    labelKey: 'bottom.branches',
    target: 'map',
    icon: (active) =>
      active ? (
        <svg {...svgProps} fill="currentColor" stroke="none">
          <path d="M12 22c-.4 0-.78-.16-1.05-.45C8.2 18.7 4 14.4 4 10a8 8 0 1 1 16 0c0 4.4-4.2 8.7-6.95 11.55-.27.29-.65.45-1.05.45z" />
          <circle cx="12" cy="10" r="2.9" fill="var(--bg)" />
        </svg>
      ) : (
        <svg {...svgProps} fill="none" stroke="currentColor">
          <path d="M19 10c0 5.2-5.4 9.6-6.6 10.7a.6.6 0 0 1-.8 0C10.4 19.6 5 15.2 5 10a7 7 0 0 1 14 0z" />
          <circle cx="12" cy="10" r="2.6" />
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
                className="relative w-full flex flex-col items-center gap-1 pt-2 pb-1.5 px-1"
              >
                <span className="relative flex items-center justify-center w-[3.25rem] h-9">
                  {isActive && (
                    <motion.span
                      layoutId="bottomnav-pill"
                      className="absolute inset-0 rounded-[1rem] bg-brand/12"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                      aria-hidden="true"
                    />
                  )}
                  <motion.span
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                    className={`relative w-[1.6rem] h-[1.6rem] transition-colors duration-200 ${
                      isActive ? 'text-brand' : 'text-[var(--muted)]'
                    }`}
                  >
                    {tab.icon(isActive)}
                  </motion.span>
                </span>
                <span
                  className={`text-[11px] leading-none transition-colors duration-200 ${
                    isActive ? 'text-brand font-bold' : 'text-[var(--muted)] font-medium'
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
