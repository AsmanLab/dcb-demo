'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';

interface AISectionProps {
  onOpenChat: () => void;
}

const CHAT_PREVIEW = [
  { role: 'user' as const, text: 'Какой депозит самый выгодный?' },
  { role: 'bot' as const, text: '«БайБол+» — 14% годовых! Срок от 12 месяцев с капитализацией процентов.' },
  { role: 'user' as const, text: 'Как оформить кредит онлайн?' },
  { role: 'bot' as const, text: 'Заполните заявку на сайте — решение за 15 минут. Нужен только паспорт.' },
];

const features = [
  { key: 'ai.feature1' as const, icon: '🤖' },
  { key: 'ai.feature2' as const, icon: '🌐' },
  { key: 'ai.feature3' as const, icon: '🔍' },
  { key: 'ai.feature4' as const, icon: '👤' },
] as const;

export function AISection({ onOpenChat }: AISectionProps) {
  const t = useT();

  return (
    <Section id="ai" className="py-20 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: marketing copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                AI Online
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
                {t('ai.title')}
              </h2>
              <p className="text-[var(--muted)] text-lg">{t('ai.subtitle')}</p>
            </div>

            <ul className="space-y-3" role="list">
              {features.map(({ key, icon }) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 text-[var(--text)]"
                >
                  <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
                  <span className="text-sm">{t(key)}</span>
                </motion.li>
              ))}
            </ul>

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand hover:bg-brand-600 text-white font-semibold text-sm transition-all shadow-[0_10px_40px_-10px_rgba(228,0,43,0.5)]"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
              {t('ai.ask')}
            </button>
          </motion.div>

          {/* Right: chat preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[var(--bg)] rounded-3xl border border-[var(--border)] overflow-hidden shadow-2xl"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)] bg-[var(--surface)]">
              <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(228,0,43,0.5)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{t('ai.title')}</p>
                <p className="text-xs text-emerald-400">● Online</p>
              </div>
            </div>

            {/* Messages preview */}
            <div className="p-5 space-y-3">
              {CHAT_PREVIEW.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.35 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-brand text-white rounded-br-sm'
                      : 'bg-[var(--surface)] text-[var(--text)] rounded-bl-sm border border-[var(--border)]'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fake input */}
            <div className="px-5 pb-5">
              <div className="flex items-center gap-2 bg-[var(--surface)] rounded-full px-4 py-2.5 border border-[var(--border)]">
                <span className="text-sm text-[var(--muted)] flex-1">{t('chat.placeholder')}</span>
                <button
                  onClick={onOpenChat}
                  className="w-8 h-8 rounded-full bg-brand flex items-center justify-center flex-shrink-0"
                  aria-label={t('ai.ask')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="white" strokeWidth="2" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
