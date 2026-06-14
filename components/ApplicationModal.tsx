'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from './providers';

interface ApplyDetail {
  product?: string;
}

// Loose KG phone check: optional +996 / 0 prefix, 9 significant digits.
function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 12;
}

export function ApplicationModal() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: boolean; phone?: boolean }>({});
  const [done, setDone] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ApplyDetail>).detail;
      setProduct(detail?.product);
      setName('');
      setPhone('');
      setErrors({});
      setDone(false);
      setOpen(true);
    };
    window.addEventListener('dcb:apply', handler);
    return () => window.removeEventListener('dcb:apply', handler);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => nameRef.current?.focus(), 250);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { name: name.trim().length < 2, phone: !isValidPhone(phone) };
    setErrors(next);
    if (next.name || next.phone) return;
    // Demo: no backend — show success state.
    setDone(true);
    setTimeout(() => setOpen(false), 2600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={t('apply.title')}
        >
          <motion.div
            initial={{ y: '100%', opacity: 0.5, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="w-full sm:max-w-md bg-[var(--bg)] rounded-t-3xl sm:rounded-3xl border border-[var(--border)] shadow-2xl overflow-hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={e => e.stopPropagation()}
          >
            {done ? (
              <div className="px-6 py-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-600 flex items-center justify-center"
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
                <h3 className="font-display text-2xl font-extrabold text-[var(--text)] mb-2">{t('apply.successTitle')}</h3>
                <p className="text-[var(--muted)]">{t('toast.success')}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="px-6 py-7" noValidate>
                {/* Drag handle on mobile */}
                <div className="sm:hidden w-10 h-1 rounded-full bg-[var(--border)] mx-auto mb-5" aria-hidden="true" />

                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="font-display text-2xl font-extrabold text-[var(--text)]">{t('apply.title')}</h3>
                  <button type="button" onClick={close} aria-label={t('apply.close')}
                    className="w-9 h-9 -mr-1 flex items-center justify-center rounded-full hover:bg-[var(--surface)] transition-colors flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <p className="text-[var(--muted)] mb-6">{t('apply.subtitle')}</p>

                {product && (
                  <div className="mb-5 px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                    <p className="text-xs text-[var(--muted)] mb-0.5">{t('apply.product')}</p>
                    <p className="font-semibold text-[var(--text)]">{product}</p>
                  </div>
                )}

                <label className="block mb-4">
                  <span className="block text-sm font-semibold text-[var(--text)] mb-1.5">{t('apply.name')}</span>
                  <input
                    ref={nameRef}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={t('apply.namePh')}
                    aria-invalid={errors.name || undefined}
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border text-[var(--text)] text-base placeholder:text-[var(--muted)] focus:outline-none transition-colors ${
                      errors.name ? 'border-brand' : 'border-[var(--border)] focus:border-brand/50'
                    }`}
                  />
                  {errors.name && <span className="block mt-1 text-xs text-brand">{t('apply.errName')}</span>}
                </label>

                <label className="block mb-6">
                  <span className="block text-sm font-semibold text-[var(--text)] mb-1.5">{t('apply.phone')}</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+996 700 000 000"
                    aria-invalid={errors.phone || undefined}
                    className={`w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border text-[var(--text)] text-base placeholder:text-[var(--muted)] focus:outline-none transition-colors ${
                      errors.phone ? 'border-brand' : 'border-[var(--border)] focus:border-brand/50'
                    }`}
                  />
                  {errors.phone && <span className="block mt-1 text-xs text-brand">{t('apply.errPhone')}</span>}
                </label>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-brand hover:bg-brand-600 text-white font-bold text-base transition-colors"
                >
                  {t('apply.submit')}
                </button>
                <p className="mt-3 text-center text-xs text-[var(--muted)]">{t('apply.agree')}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
