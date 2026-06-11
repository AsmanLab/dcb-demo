'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useT } from './providers';

const stats = [
  { key: 'trust.support' as const, icon: '🕐' },
  { key: 'trust.callcenter' as const, icon: '📞' },
  { key: 'trust.license' as const, icon: '🏦' },
  { key: 'trust.languages' as const, icon: '🌐' },
  { key: 'trust.branches' as const, icon: '📍' },
] as const;

export function TrustBar() {
  const t = useT();

  return (
    <section className="py-8 bg-[var(--surface)]" aria-label="Ключевые показатели">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map(({ key, icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center text-center gap-1.5 p-4 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)]"
            >
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <span className="text-sm font-semibold text-[var(--text)]">{t(key)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
