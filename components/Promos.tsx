'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { useT } from './providers';
import { ProductCard, type ProductCardData } from './ProductCard';

// Offer-style products, shown as a horizontal scroller. These were moved out of
// Recommended Products to avoid duplication.
const offers: ProductCardData[] = [
  {
    id: 'deposit',
    name: { ru: 'Депозит «Бай Бол» — 14%', kg: '«Бай Бол» аманаты — 14%', en: '"Bai Bol" Deposit — 14%' },
    desc: { ru: 'Повышенная ставка на срок 11 месяцев. Акция до 31.07.2026.', kg: '11 айга жогорулатылган ставка. Акция 31.07.2026га чейин.', en: 'Boosted rate for an 11-month term. Until 31.07.2026.' },
    badge: { ru: 'Акция', kg: 'Акция', en: 'Promo' },
    cta: { ru: 'Открыть вклад', kg: 'Аманат ачуу', en: 'Open a Deposit' },
    image: '/products/deposit.svg', tint: 'rgba(243,146,0,0.16)', action: { type: 'apply' },
  },
  {
    id: 'qr',
    name: { ru: 'QR и POS-терминалы', kg: 'QR жана POS-терминалдар', en: 'QR & POS Terminals' },
    desc: { ru: 'Подключение и обслуживание для бизнеса бесплатно — 0 сом.', kg: 'Бизнес үчүн туташтыруу жана тейлөө акысыз — 0 сом.', en: 'Free connection and maintenance for business — 0 KGS.' },
    badge: { ru: 'Бизнесу', kg: 'Бизнеске', en: 'Business' },
    cta: { ru: 'Открыть счёт', kg: 'Эсеп ачуу', en: 'Open an Account' },
    image: '/products/business.svg', tint: 'rgba(160,107,255,0.16)', action: { type: 'apply' },
  },
  {
    id: 'transfers',
    name: { ru: 'Переводы в Китай', kg: 'Кытайга которуулар', en: 'Transfers to China' },
    desc: { ru: 'Прямые переводы на кошелёк WeChat (Weixin). Быстро и удобно.', kg: 'WeChat (Weixin) капчыгына түз которуулар. Тез жана ыңгайлуу.', en: 'Direct transfers to a WeChat (Weixin) wallet. Fast and easy.' },
    badge: { ru: 'Переводы', kg: 'Которуулар', en: 'Transfers' },
    cta: { ru: 'Отправить', kg: 'Жөнөтүү', en: 'Send' },
    image: '/products/transfers.svg', tint: 'rgba(45,212,191,0.16)', action: { type: 'apply' },
  },
  {
    id: 'rassrochka',
    name: { ru: 'Рассрочка 0%', kg: 'Бөлүп төлөө 0%', en: '0% Installments' },
    desc: { ru: 'Покупки у партнёров банка без переплаты и процентов.', kg: 'Банктын өнөктөштөрүнөн ашыкча төлөмсүз сатып алуулар.', en: 'Purchases from bank partners with no overpayment.' },
    badge: { ru: 'Покупки', kg: 'Сатып алуу', en: 'Shopping' },
    cta: { ru: 'Подключить', kg: 'Туташтыруу', en: 'Get it' },
    image: '/products/cash.svg', tint: 'rgba(255,138,30,0.16)', action: { type: 'apply' },
  },
  {
    id: 'overdraft',
    name: { ru: 'Бизнес-овердрафт', kg: 'Бизнес-овердрафт', en: 'Business Overdraft' },
    desc: { ru: 'Оборотные средства на 3–24 месяца без залога.', kg: '3–24 айга күрөөсүз жүгүртүү каражаттары.', en: 'Working capital for 3–24 months, no collateral.' },
    badge: { ru: 'Бизнесу', kg: 'Бизнеске', en: 'Business' },
    cta: { ru: 'Оформить', kg: 'Тариздөө', en: 'Apply' },
    image: '/products/business-loan.svg', tint: 'rgba(91,141,239,0.16)', action: { type: 'apply' },
  },
];

export function Promos() {
  const t = useT();

  return (
    <Section id="promos" className="py-14 sm:py-20 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-[1.9rem] sm:text-[2.4rem] font-extrabold text-[var(--text)] mb-1">
            {t('promos.title')}
          </h2>
          <p className="text-[var(--muted)] text-lg">{t('promos.subtitle')}</p>
        </motion.div>
      </div>

      {/* Horizontal scroller — edge-to-edge with snap */}
      <div className="overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory">
        <div className="flex gap-5 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-max">
          {offers.map(offer => (
            <div key={offer.id} className="snap-start w-[280px] sm:w-[320px] flex-shrink-0">
              <ProductCard data={offer} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
