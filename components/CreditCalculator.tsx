'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedNumber } from './AnimatedNumber';
import { Section } from './Section';
import { useT } from './providers';

function calcAnnuity(principal: number, annualRate: number, months: number) {
  if (months <= 0 || annualRate <= 0) return { monthly: 0, total: 0, overpay: 0 };
  const r = annualRate / 12 / 100;
  const monthly = principal * r / (1 - Math.pow(1 + r, -months));
  const total = monthly * months;
  const overpay = total - principal;
  return { monthly, total, overpay };
}

export function CreditCalculator() {
  const t = useT();
  const [amount, setAmount] = useState(500000);
  const [term, setTerm] = useState(24);
  const [rate, setRate] = useState(18);
  const [showToast, setShowToast] = useState(false);

  const { monthly, total, overpay } = calcAnnuity(amount, rate, term);
  const paidPct = Math.min((amount / total) * 100, 99);

  const fmtSom = useCallback((n: number) =>
    Math.round(n).toLocaleString('ru-KG'), []);

  const handleApply = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <Section id="credit" className="py-20 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text)] mb-3">
            {t('calc.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg">{t('calc.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-7 bg-[var(--bg)] rounded-3xl p-7 border border-[var(--border)]"
          >
            {/* Amount */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="calc-amount" className="text-sm font-semibold text-[var(--text)]">{t('calc.amount')}</label>
                <span className="text-sm font-bold text-brand">{fmtSom(amount)} {t('calc.som')}</span>
              </div>
              <input
                id="calc-amount"
                type="range"
                min={10000}
                max={3000000}
                step={10000}
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full accent-brand h-2 cursor-pointer"
                aria-label={t('calc.amount')}
              />
              <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                <span>10 000</span><span>3 000 000 {t('calc.som')}</span>
              </div>
            </div>

            {/* Term */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="calc-term" className="text-sm font-semibold text-[var(--text)]">{t('calc.term')}</label>
                <span className="text-sm font-bold text-brand">{term} мес.</span>
              </div>
              <input
                id="calc-term"
                type="range"
                min={3}
                max={60}
                step={1}
                value={term}
                onChange={e => setTerm(Number(e.target.value))}
                className="w-full accent-brand h-2 cursor-pointer"
                aria-label={t('calc.term')}
              />
              <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                <span>3 мес.</span><span>60 мес.</span>
              </div>
            </div>

            {/* Rate */}
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="calc-rate" className="text-sm font-semibold text-[var(--text)]">{t('calc.rate')}</label>
                <span className="text-sm font-bold text-brand">{rate}%</span>
              </div>
              <input
                id="calc-rate"
                type="range"
                min={12}
                max={28}
                step={0.5}
                value={rate}
                onChange={e => setRate(Number(e.target.value))}
                className="w-full accent-brand h-2 cursor-pointer"
                aria-label={t('calc.rate')}
              />
              <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                <span>12%</span><span>28%</span>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5"
          >
            {/* Monthly payment — highlighted */}
            <div className="bg-[var(--bg)] rounded-3xl p-6 border border-[var(--border)] flex-1 flex flex-col justify-center">
              <p className="text-sm text-[var(--muted)] mb-1">{t('calc.monthly')}</p>
              <p className="font-display text-4xl font-extrabold text-[var(--text)]">
                <AnimatedNumber value={monthly} formatter={fmtSom} /> <span className="text-xl text-[var(--muted)]">{t('calc.som')}</span>
              </p>

              {/* Bar */}
              <div className="mt-4 mb-4">
                <div className="h-2 rounded-full bg-[var(--surface)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #FF3355, #E4002B)' }}
                    animate={{ width: `${paidPct}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[var(--muted)] mt-1">
                  <span>Основной долг {paidPct.toFixed(0)}%</span>
                  <span>Проценты {(100 - paidPct).toFixed(0)}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-xs text-[var(--muted)] mb-0.5">{t('calc.overpay')}</p>
                  <p className="font-semibold text-[var(--text)] text-sm">
                    <AnimatedNumber value={overpay} formatter={fmtSom} /> {t('calc.som')}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                  <p className="text-xs text-[var(--muted)] mb-0.5">{t('calc.total')}</p>
                  <p className="font-semibold text-[var(--text)] text-sm">
                    <AnimatedNumber value={total} formatter={fmtSom} /> {t('calc.som')}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full py-4 rounded-2xl bg-brand hover:bg-brand-600 text-white font-semibold text-base transition-all shadow-[0_10px_40px_-10px_rgba(228,0,43,0.5)] hover:shadow-[0_10px_40px_-4px_rgba(228,0,43,0.6)] hover:-translate-y-0.5"
              aria-label={t('calc.apply')}
            >
              {t('calc.apply')}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-xl font-semibold text-sm"
          >
            {t('toast.success')}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
