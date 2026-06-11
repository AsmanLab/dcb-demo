'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SailLogo } from './SailLogo';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';
import { MegaMenu } from './MegaMenu';
import { megaMenu } from '@/lib/megamenu';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<DictKey | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback((key: DictKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(megaMenu[key] ? key : null);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!activeMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveMenu(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeMenu]);

  const navItems = [
    { key: 'nav.credits' as const, href: '#products' },
    { key: 'nav.deposits' as const, href: '#deposits' },
    { key: 'nav.cards' as const, href: '#products' },
    { key: 'nav.transfers' as const, href: '#products' },
    { key: 'nav.business' as const, href: '#products' },
    { key: 'nav.about' as const, href: '#map' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[var(--bg)] border-b border-[var(--border)] ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 flex-shrink-0" aria-label="Дос-Кредобанк — на главную">
              <SailLogo size={32} />
              <span className="font-display font-extrabold text-sm tracking-widest uppercase text-[var(--text)]">
                DOSCREDOBANK
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Основная навигация">
              {navItems.map(({ key, href }) => (
                <a
                  key={key}
                  href={href}
                  onMouseEnter={() => openMenu(key)}
                  onMouseLeave={scheduleClose}
                  onFocus={() => openMenu(key)}
                  aria-haspopup={megaMenu[key] ? 'true' : undefined}
                  aria-expanded={megaMenu[key] ? activeMenu === key : undefined}
                  className={`text-sm font-medium transition-colors ${
                    activeMenu === key ? 'text-brand' : 'text-[var(--muted)] hover:text-brand'
                  }`}
                >
                  {t(key)}
                </a>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href="tel:8686"
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-[var(--text)] hover:text-brand transition-colors"
                aria-label="Позвонить в колл-центр 8686"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                {t('nav.phone')}
              </a>
              <div className="hidden sm:block"><LanguageSwitcher /></div>
              <ThemeToggle />
              <a
                href="#"
                className="hidden md:inline-flex items-center px-5 py-2 rounded-full bg-brand hover:bg-brand-600 text-white text-sm font-semibold transition-colors"
              >
                {t('nav.login')}
              </a>
              {/* Hamburger */}
              <button
                className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--surface)] transition-colors"
                onClick={() => setMenuOpen(true)}
                aria-label="Открыть меню"
                aria-expanded={menuOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <MegaMenu
          active={activeMenu}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          onClose={() => setActiveMenu(null)}
        />
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} navItems={navItems} />
    </>
  );
}
