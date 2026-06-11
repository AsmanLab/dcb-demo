export const CURRENCY_RATES = [
  { code: 'USD', flag: '🇺🇸', buy: 89.40, sell: 89.90 },
  { code: 'EUR', flag: '🇪🇺', buy: 96.20, sell: 96.90 },
  { code: 'RUB', flag: '🇷🇺', buy: 1.02, sell: 1.06 },
  { code: 'KZT', flag: '🇰🇿', buy: 0.176, sell: 0.182 },
] as const;

export type CurrencyRate = typeof CURRENCY_RATES[number];

export const BRANCH_LOCATIONS = [
  { id: 1, type: 'branch' as const, name: 'Головной офис', address: 'просп. Чуй 92, 6 этаж', city: 'Бишкек', hours: '09:00–18:00', phone: '8686', is247: false },
  { id: 2, type: 'atm' as const, name: 'Банкомат ТЦ «Азия Молл»', address: 'просп. Манаса 54', city: 'Бишкек', hours: '24/7', phone: '', is247: true },
  { id: 3, type: 'branch' as const, name: 'Офис Ошский рынок', address: 'ул. Курманжан Датки 2', city: 'Бишкек', hours: '09:00–18:00', phone: '8686', is247: false },
  { id: 4, type: 'exchange' as const, name: 'Обмен валют Центр', address: 'просп. Эркиндик 21', city: 'Бишкек', hours: '09:00–20:00', phone: '', is247: false },
  { id: 5, type: 'atm' as const, name: 'Банкомат «Дордой»', address: 'Алматинское ш., рынок Дордой', city: 'Бишкек', hours: '24/7', phone: '', is247: true },
  { id: 6, type: 'branch' as const, name: 'Офис г. Ош', address: 'ул. Ленина 185', city: 'Ош', hours: '09:00–18:00', phone: '8686', is247: false },
] as const;
