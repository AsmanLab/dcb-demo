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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[var(--bg)]" aria-label="Главный баннер">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Red radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 dark:opacity-30"
          style={{ background: 'radial-gradient(ellipse at center, #E4002B 0%, transparent 70%)' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{ backgroundImage: 'linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* Hero SVG Sail */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.06] dark:opacity-[0.08] pointer-events-none" aria-hidden="true">
        <motion.svg
          width="600" height="700" viewBox="0 0 600 700" fill="none"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M300 50 L550 600 L300 520 L50 600 Z" fill="url(#hero-sail)" />
          <defs>
            <linearGradient id="hero-sail" x1="50" y1="50" x2="550" y2="600" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF3355" />
              <stop offset="100%" stopColor="#E4002B" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* Left: copy */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" aria-hidden="true" />
                Лицензия НБ КР №037
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text)] leading-tight whitespace-pre-line">
                {t('hero.headline')}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg text-[var(--muted)] max-w-md"
            >
              {t('hero.slogan')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-[0_10px_40px_-10px_rgba(228,0,43,0.5)] hover:shadow-[0_10px_40px_-4px_rgba(228,0,43,0.6)] hover:-translate-y-0.5"
              >
                {t('hero.cta.open')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <button
                onClick={onOpenChat}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] hover:border-brand/40 bg-[var(--surface)] text-[var(--text)] font-semibold text-sm transition-all hover:bg-[var(--surface-2)] hover:-translate-y-0.5"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                {t('hero.cta.ai')}
              </button>
            </motion.div>
          </div>

          {/* Right: App card mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-72">
              {/* Phone card */}
              <div className="rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-6 shadow-2xl">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-[var(--muted)]">DCB 360</p>
                    <p className="text-sm font-semibold text-[var(--text)]">Личный кабинет</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center">
                    <span className="text-brand text-xs font-bold">D</span>
                  </div>
                </div>

                {/* Balance */}
                <div className="mb-5">
                  <p className="text-xs text-[var(--muted)] mb-1">Общий баланс</p>
                  <p className="font-display text-3xl font-extrabold text-[var(--text)]">287 450 <span className="text-lg text-[var(--muted)]">сом</span></p>
                </div>

                {/* Mini card */}
                <div className="rounded-2xl p-4 mb-4" style={{ background: 'linear-gradient(135deg, #FF3355, #E4002B, #B3001B)' }}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-white/60 text-xs">Visa Classic</p>
                      <p className="text-white font-semibold text-sm mt-0.5">Дос-Кредобанк</p>
                    </div>
                    <svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-hidden="true">
                      <circle cx="12" cy="10" r="10" fill="white" fillOpacity="0.5"/>
                      <circle cx="20" cy="10" r="10" fill="white" fillOpacity="0.3"/>
                    </svg>
                  </div>
                  <p className="text-white/80 text-xs tracking-widest">•••• •••• •••• 4892</p>
                </div>

                {/* Quick actions */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Перевод', icon: '↗' },
                    { label: 'Оплата', icon: '⚡' },
                    { label: 'QR', icon: '⊞' },
                    { label: 'Карты', icon: '💳' },
                  ].map(({ label, icon }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-[var(--surface-2)] flex items-center justify-center text-sm font-medium text-[var(--text)]">
                        {icon}
                      </div>
                      <span className="text-[10px] text-[var(--muted)]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -right-8 top-16 bg-[var(--surface-2)] rounded-2xl px-3 py-2 border border-[var(--border)] shadow-lg"
              >
                <p className="text-xs font-semibold text-emerald-400">+14% годовых</p>
                <p className="text-xs text-[var(--muted)]">БайБол+</p>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -left-8 bottom-24 bg-[var(--surface-2)] rounded-2xl px-3 py-2 border border-[var(--border)] shadow-lg"
              >
                <p className="text-xs font-semibold text-[var(--text)]">Кредит «Тез»</p>
                <p className="text-xs text-brand">от 18%</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
