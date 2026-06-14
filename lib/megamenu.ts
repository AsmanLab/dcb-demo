import type { DictKey } from './i18n';
import type { Localized } from './data';

export interface MenuLink {
  label: Localized;
  href: string;
}

export interface MenuSection {
  title: Localized;
  links: MenuLink[];
}

// Mega menu content keyed by the nav item's dict key.
// Nav items without an entry render as plain links.
// Product names mirror dcb.kg (see SITE-PLAN.md §1.3–1.7).
export const megaMenu: Partial<Record<DictKey, MenuSection[]>> = {
  'nav.credits': [
    {
      title: { ru: 'Взять кредит', kg: 'Насыя алуу', en: 'Get a Loan' },
      links: [
        { label: { ru: 'Быстрый кредит', kg: 'Тез насыя', en: 'Quick Loan' }, href: '#products' },
        { label: { ru: 'Потребительский кредит', kg: 'Керектөө насыясы', en: 'Consumer Loan' }, href: '#products' },
        { label: { ru: 'Мобильный кредит', kg: 'Мобилдик насыя', en: 'Mobile Loan' }, href: '#products' },
        { label: { ru: 'Ипотека', kg: 'Ипотека', en: 'Mortgage' }, href: '#products' },
      ],
    },
    {
      title: { ru: 'Бизнесу', kg: 'Бизнеске', en: 'For Business' },
      links: [
        { label: { ru: 'Бизнес кредит', kg: 'Бизнес насыя', en: 'Business Loan' }, href: '#products' },
        { label: { ru: 'Бизнес-овердрафт', kg: 'Бизнес-овердрафт', en: 'Business Overdraft' }, href: '#products' },
        { label: { ru: 'Банковские гарантии', kg: 'Банктык кепилдиктер', en: 'Bank Guarantees' }, href: '#products' },
      ],
    },
    {
      title: { ru: 'DCB Green', kg: 'DCB Green', en: 'DCB Green' },
      links: [
        { label: { ru: 'Экодом', kg: 'Экоүй', en: 'EcoHome' }, href: '#green' },
        { label: { ru: 'Экоавто', kg: 'Экоавто', en: 'EcoCar' }, href: '#green' },
        { label: { ru: 'Экоагро', kg: 'Экоагро', en: 'EcoAgro' }, href: '#green' },
        { label: { ru: 'Экотуризм', kg: 'Экотуризм', en: 'EcoTourism' }, href: '#green' },
      ],
    },
    {
      title: { ru: 'Сервисы', kg: 'Кызматтар', en: 'Services' },
      links: [
        { label: { ru: 'Кредитный калькулятор', kg: 'Насыя калькулятору', en: 'Loan Calculator' }, href: '#credit' },
        { label: { ru: 'DCB Гид — вопросы и ответы', kg: 'DCB Гид — суроо-жооптор', en: 'DCB Guide — Q&A' }, href: '#faq' },
      ],
    },
  ],
  'nav.deposits': [
    {
      title: { ru: 'Вклады', kg: 'Аманаттар', en: 'Deposits' },
      links: [
        { label: { ru: '«Бай Бол» — до 14% годовых', kg: '«Бай Бол» — жылдык 14%га чейин', en: '"Bai Bol" — up to 14% p.a.' }, href: '#deposits' },
        { label: { ru: '«Бай Бол +»', kg: '«Бай Бол +»', en: '"Bai Bol +"' }, href: '#deposits' },
        { label: { ru: 'Зелёный депозит «Жашыл аманат»', kg: '«Жашыл аманат» жашыл депозити', en: 'Green Deposit "Zhashyl Amanat"' }, href: '#deposits' },
      ],
    },
    {
      title: { ru: 'Сервисы', kg: 'Кызматтар', en: 'Services' },
      links: [
        { label: { ru: 'Открыть онлайн', kg: 'Онлайн ачуу', en: 'Open Online' }, href: '#deposits' },
        { label: { ru: 'Сберкассы 24/7', kg: 'Аманат кассалары 24/7', en: '24/7 Savings Offices' }, href: '#map' },
      ],
    },
    {
      title: { ru: 'Гарантии', kg: 'Кепилдиктер', en: 'Guarantees' },
      links: [
        { label: { ru: 'Страхование вкладов до 1 млн сом', kg: '1 млн сомго чейин аманаттарды камсыздандыруу', en: 'Deposit insurance up to 1M KGS' }, href: '#faq' },
        { label: { ru: 'Вопросы по депозитам', kg: 'Аманаттар боюнча суроолор', en: 'Deposit FAQ' }, href: '#faq' },
      ],
    },
  ],
  'nav.cards': [
    {
      title: { ru: 'Карты', kg: 'Карталар', en: 'Cards' },
      links: [
        { label: { ru: 'Элкарт DCB', kg: 'Элкарт DCB', en: 'Elcart DCB' }, href: '#products' },
        { label: { ru: 'Карта пенсионера', kg: 'Пенсионер картасы', en: 'Pensioner Card' }, href: '#products' },
        { label: { ru: 'Социальные выплаты', kg: 'Социалдык төлөмдөр', en: 'Social Benefits Card' }, href: '#products' },
        { label: { ru: 'DCB KIDS — детская карта', kg: 'DCB KIDS — балдар картасы', en: 'DCB KIDS Children’s Card' }, href: '#products' },
      ],
    },
    {
      title: { ru: 'Сервисы', kg: 'Кызматтар', en: 'Services' },
      links: [
        { label: { ru: 'QR-оплата', kg: 'QR-төлөм', en: 'QR Payment' }, href: '#products' },
        { label: { ru: 'Приложение ELCART', kg: 'ELCART колдонмосу', en: 'ELCART App' }, href: '#app' },
        { label: { ru: 'Банкоматы 24/7', kg: 'Банкоматтар 24/7', en: '24/7 ATMs' }, href: '#map' },
      ],
    },
  ],
  'nav.transfers': [
    {
      title: { ru: 'Системы переводов', kg: 'Которуу системалары', en: 'Transfer Systems' },
      links: [
        { label: { ru: 'Золотая Корона — 170+ стран', kg: 'Золотая Корона — 170+ өлкө', en: 'Golden Crown — 170+ countries' }, href: '#products' },
        { label: { ru: 'SWIFT — по всему миру', kg: 'SWIFT — бүткүл дүйнө боюнча', en: 'SWIFT — worldwide' }, href: '#products' },
        { label: { ru: 'Western Union · Ria · MoneyGram', kg: 'Western Union · Ria · MoneyGram', en: 'Western Union · Ria · MoneyGram' }, href: '#products' },
        { label: { ru: 'WeChat — переводы в Китай', kg: 'WeChat — Кытайга которуулар', en: 'WeChat — transfers to China' }, href: '#products' },
      ],
    },
    {
      title: { ru: 'Валюта', kg: 'Валюта', en: 'Currency' },
      links: [
        { label: { ru: 'Курсы валют', kg: 'Валюта курстары', en: 'Exchange Rates' }, href: '#' },
        { label: { ru: 'Обмен валют', kg: 'Валюта алмашуу', en: 'Currency Exchange' }, href: '#map' },
      ],
    },
  ],
  'nav.business': [
    {
      title: { ru: 'Открыть счёт', kg: 'Эсеп ачуу', en: 'Open an Account' },
      links: [
        { label: { ru: 'РКО — счёт от 15 минут', kg: 'РКО — эсеп 15 мүнөттөн', en: 'Settlement account from 15 min' }, href: '#products' },
        { label: { ru: 'Счёт + ККМ бесплатно', kg: 'Эсеп + ККМ акысыз', en: 'Account + cash register free' }, href: '#products' },
        { label: { ru: 'Зарплатный проект', kg: 'Эмгек акы долбоору', en: 'Payroll Project' }, href: '#products' },
      ],
    },
    {
      title: { ru: 'Принимать платежи', kg: 'Төлөмдөрдү кабыл алуу', en: 'Accept Payments' },
      links: [
        { label: { ru: 'QR и POS-терминалы — 0 сом', kg: 'QR жана POS-терминалдар — 0 сом', en: 'QR & POS terminals — 0 KGS' }, href: '#products' },
        { label: { ru: 'DCB Business', kg: 'DCB Business', en: 'DCB Business' }, href: '#app' },
      ],
    },
    {
      title: { ru: 'Финансирование', kg: 'Каржылоо', en: 'Financing' },
      links: [
        { label: { ru: 'Бизнес кредит — 3–36 мес.', kg: 'Бизнес насыя — 3–36 ай', en: 'Business loan — 3–36 mo.' }, href: '#products' },
        { label: { ru: 'Бизнес-овердрафт — 3–24 мес.', kg: 'Бизнес-овердрафт — 3–24 ай', en: 'Business overdraft — 3–24 mo.' }, href: '#products' },
        { label: { ru: 'Банковские гарантии', kg: 'Банктык кепилдиктер', en: 'Bank Guarantees' }, href: '#products' },
        { label: { ru: 'Депозиты юр. лиц', kg: 'Юр. жактардын аманаттары', en: 'Corporate Deposits' }, href: '#deposits' },
      ],
    },
  ],
};
