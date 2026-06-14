'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useT } from './providers';
import { openApplication } from '@/lib/apply';

export function CTABand() {
  const t = useT();

  return (
    <section className="relative py-16 sm:py-20 bg-[#14161D]" aria-label="Призыв к действию">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 whitespace-pre-line">
            {t('cta.title')}
          </h2>
          <p className="text-white/70 text-lg mb-8">{t('cta.subtitle')}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openApplication()}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand hover:bg-brand-600 text-white font-bold text-base transition-colors"
            >
              {t('cta.button')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <a
              href="tel:8686"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/40 text-white font-bold text-base hover:border-white/70 hover:bg-white/10 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              8686
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
