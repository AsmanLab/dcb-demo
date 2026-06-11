'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SailLogo } from './SailLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useT } from './providers';
import type { DictKey } from '@/lib/i18n';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: { key: DictKey; href: string }[];
}

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const t = useT();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-[60] bg-[var(--bg)] flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню"
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border)]">
            <SailLogo size={30} />
            <button
              onClick={onClose}
              aria-label="Закрыть меню"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--surface)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-8" aria-label="Мобильная навигация">
            <ul className="space-y-1">
              {navItems.map(({ key, href }, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <a
                    href={href}
                    onClick={onClose}
                    className="block py-3 px-4 rounded-xl text-lg font-semibold text-[var(--text)] hover:bg-[var(--surface)] transition-colors"
                  >
                    {t(key)}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="px-5 pb-8 space-y-4">
            <LanguageSwitcher />
            <a
              href="#"
              onClick={onClose}
              className="block w-full text-center py-3 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold transition-colors"
            >
              {t('nav.login')}
            </a>
            <a
              href="tel:8686"
              className="block w-full text-center py-3 rounded-full border border-[var(--border)] text-[var(--text)] font-semibold hover:bg-[var(--surface)] transition-colors"
            >
              8686
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
