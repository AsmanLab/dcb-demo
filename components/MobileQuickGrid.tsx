'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ProductIcon, type ProductIconName } from './ProductIcons';
import { useT } from './providers';
import { openApplication } from '@/lib/apply';
import type { DictKey } from '@/lib/i18n';

type Action = { type: 'scroll'; target: string } | { type: 'chat' } | { type: 'apply' };

interface Tile {
  icon: ProductIconName;
  labelKey: DictKey;
  action: Action;
}

const tiles: Tile[] = [
  { icon: 'cards', labelKey: 'nav.cards', action: { type: 'scroll', target: 'products' } },
  { icon: 'loans', labelKey: 'nav.credits', action: { type: 'scroll', target: 'products' } },
  { icon: 'deposits', labelKey: 'nav.deposits', action: { type: 'scroll', target: 'deposits' } },
  { icon: 'transfers', labelKey: 'nav.transfers', action: { type: 'scroll', target: 'products' } },
  { icon: 'business', labelKey: 'nav.business', action: { type: 'scroll', target: 'products' } },
  { icon: 'calculator', labelKey: 'bottom.calc', action: { type: 'scroll', target: 'credit' } },
  { icon: 'branches', labelKey: 'bottom.branches', action: { type: 'scroll', target: 'map' } },
  { icon: 'assistant', labelKey: 'bottom.assistant', action: { type: 'chat' } },
];

function run(action: Action) {
  if (action.type === 'chat') {
    window.dispatchEvent(new CustomEvent('dcb:open-chat'));
  } else if (action.type === 'apply') {
    openApplication();
  } else {
    document.getElementById(action.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function MobileQuickGrid() {
  const t = useT();

  return (
    <section className="lg:hidden px-4 -mt-4 pb-2" aria-label="Быстрый доступ к продуктам">
      <div className="grid grid-cols-4 gap-x-3 gap-y-5">
        {tiles.map((tile, i) => (
          <motion.button
            key={tile.icon}
            onClick={() => run(tile.action)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            whileTap={{ scale: 0.92 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="drop-shadow-sm">
              <ProductIcon name={tile.icon} size={54} />
            </span>
            <span className="text-[12px] font-medium leading-tight text-center text-[var(--text)]">
              {t(tile.labelKey)}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
