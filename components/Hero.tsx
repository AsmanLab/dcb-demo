'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useT } from './providers';

interface HeroProps {
  onOpenChat: () => void;
}

export function Hero({ onOpenChat }: HeroProps) {
  const t = useT();

  return (
    <section className="bg-[var(--bg)] pt-20 pb-0" aria-label="Главный баннер">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
        {/* Graphite hero card — Bakai-style large rounded card */}
        <div className="rounded-3xl bg-[#14161D] overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[420px]">
            {/* Left: copy */}
            <div className="px-8 sm:px-12 py-12 lg:py-16 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 text-white/70 text-xs font-semibold mb-5">
                  Лицензия НБ КР №037
                </span>
                <h1 className="font-display text-[clamp(1.9rem,5vw,3.25rem)] font-extrabold text-white leading-tight whitespace-pre-line">
                  {t('hero.headline')}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-[17px] text-white/70 max-w-md leading-relaxed"
              >
                {t('hero.slogan')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap gap-3 pt-2"
              >
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold text-sm transition-colors"
                >
                  {t('hero.cta.open')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
                <button
                  onClick={onOpenChat}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 hover:border-white/60 text-white font-semibold text-sm transition-colors"
                >
                  {t('hero.cta.ai')}
                </button>
              </motion.div>

              {/* Slider dots */}
              <div className="flex gap-2 pt-2" aria-hidden="true">
                <span className="w-6 h-1.5 rounded-full bg-brand" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
            </div>

            {/* Right: app card mockup */}
            <div className="hidden lg:flex justify-center items-center pr-12 py-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative w-64"
              >
                {/* Phone card */}
                <div className="rounded-3xl bg-[#1C1F2B] border border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-xs text-white/50">DCB 360</p>
                      <p className="text-sm font-semibold text-white">Личный кабинет</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-brand/30 flex items-center justify-center">
                      <span className="text-brand text-xs font-bold">D</span>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs text-white/50 mb-1">Общий баланс</p>
                    <p className="font-display text-3xl font-extrabold text-white">287 450 <span className="text-lg text-white/50">сом</span></p>
                  </div>

                  {/* Mini card */}
                  <div className="rounded-2xl p-4 mb-4 bg-brand">
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <p className="text-white/70 text-xs">Visa Classic</p>
                        <p className="text-white font-semibold text-sm mt-0.5">Дос-Кредобанк</p>
                      </div>
                      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-hidden="true">
                        <circle cx="12" cy="10" r="10" fill="white" fillOpacity="0.5"/>
                        <circle cx="20" cy="10" r="10" fill="white" fillOpacity="0.3"/>
                      </svg>
                    </div>
                    <p className="text-white/80 text-xs tracking-widest">•••• •••• •••• 4892</p>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Перевод', icon: '↗' },
                      { label: 'Оплата', icon: '⚡' },
                      { label: 'QR', icon: '⊞' },
                      { label: 'Ещё', icon: '···' },
                    ].map(({ label, icon }) => (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                          {icon}
                        </div>
                        <span className="text-[10px] text-white/50">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -right-6 top-14 bg-white rounded-2xl px-3 py-2 shadow-lg"
                >
                  <p className="text-xs font-bold text-brand">+14% годовых</p>
                  <p className="text-xs text-[#3A4150]">БайБол+</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -left-6 bottom-20 bg-white rounded-2xl px-3 py-2 shadow-lg"
                >
                  <p className="text-xs font-bold text-[#12141B]">Кредит «Тез»</p>
                  <p className="text-xs text-brand">от 18%</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
