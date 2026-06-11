'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { megaMenu } from '@/lib/megamenu';
import type { DictKey } from '@/lib/i18n';
import { useLang } from './providers';

interface MegaMenuProps {
  active: DictKey | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export function MegaMenu({ active, onMouseEnter, onMouseLeave, onClose }: MegaMenuProps) {
  const { lang } = useLang();
  const sections = active ? megaMenu[active] : undefined;

  return (
    <AnimatePresence>
      {active && sections && (
        <>
          {/* Dim the page below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 lg:top-[68px] z-40 bg-black/25 backdrop-blur-[2px]"
            onMouseEnter={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full z-50 hidden lg:block"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
              <div className="rounded-3xl bg-[var(--bg)] border border-[var(--border)] shadow-2xl shadow-black/10 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="grid grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8 p-10"
                  >
                    {sections.map((section, i) => (
                      <div key={i}>
                        <h3 className="font-display font-bold text-base text-[var(--text)] mb-4">
                          {section.title[lang]}
                        </h3>
                        <ul className="space-y-3">
                          {section.links.map((link, j) => (
                            <li key={j}>
                              <a
                                href={link.href}
                                onClick={onClose}
                                className="text-sm text-[var(--muted)] hover:text-brand transition-colors"
                              >
                                {link.label[lang]}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
