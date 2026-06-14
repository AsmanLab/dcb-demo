'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLang } from './providers';
import { openApplication } from '@/lib/apply';
import type { Localized } from '@/lib/data';

export type CardAction = { type: 'scroll'; target: string } | { type: 'apply' };

export interface ProductCardData {
  id: string;
  name: Localized;
  desc: Localized;
  cta: Localized;
  badge?: Localized;
  image: string;
  highlight?: boolean;
  tint: string; // soft glow color (rgba)
  action: CardAction;
}

// Shared product card — used in the Recommended bento grid and the
// Special-offers horizontal scroller. Fills its container (w/h-full).
export function ProductCard({ data }: { data: ProductCardData }) {
  const { lang } = useLang();
  const run = () => {
    if (data.action.type === 'apply') openApplication(data.name[lang]);
    else document.getElementById(data.action.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`group relative h-full w-full overflow-hidden rounded-3xl p-6 sm:p-7 min-h-[19rem] flex flex-col ${
        data.highlight ? 'bg-[#14161D] text-white' : 'bg-[var(--surface)] text-[var(--text)] border border-[var(--border)]'
      }`}
    >
      <div
        className="pointer-events-none absolute -top-10 -right-10 w-56 h-56 rounded-full blur-3xl"
        style={{ background: data.tint }}
        aria-hidden="true"
      />

      <div className="relative text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <h3 className={`font-display text-xl font-extrabold ${data.highlight ? 'text-white' : 'text-[var(--text)]'}`}>
            {data.name[lang]}
          </h3>
          {data.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-brand/10 text-brand text-xs font-bold whitespace-nowrap">
              {data.badge[lang]}
            </span>
          )}
        </div>
        <p className={`text-sm leading-relaxed mx-auto max-w-[22rem] ${data.highlight ? 'text-white/70' : 'text-[var(--muted)]'}`}>
          {data.desc[lang]}
        </p>
      </div>

      <div className="relative flex-1 mt-3 min-h-[8rem]">
        <Image
          src={data.image}
          alt=""
          fill
          unoptimized
          aria-hidden="true"
          className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <button
        onClick={run}
        className={`relative self-start z-10 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
          data.highlight
            ? 'bg-white text-[#14161D] hover:bg-white/90'
            : 'bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:border-brand hover:text-brand shadow-sm'
        }`}
      >
        {data.cta[lang]}
      </button>
    </motion.article>
  );
}
