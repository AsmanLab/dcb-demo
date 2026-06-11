'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useT } from './providers';

export function CTABand() {
  const t = useT();

  return (
    <section className="relative py-20 overflow-hidden" aria-label="Призыв к действию">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FF3355 0%, #E4002B 50%, #B3001B 100%)' }} />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 whitespace-pre-line">
            {t('cta.title')}
          </h2>
          <p className="text-white/80 text-lg mb-8">{t('cta.subtitle')}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-white/90 text-brand font-bold text-base transition-all shadow-xl hover:-translate-y-0.5"
            >
              {t('cta.button')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a
              href="tel:8686"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/60 text-white font-bold text-base hover:bg-white/10 transition-all"
            >
              📞 8686
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
