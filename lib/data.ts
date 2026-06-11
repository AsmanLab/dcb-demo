import type { Lang } from './i18n';

export type Localized = Record<Lang, string>;

// FX rates as published on dcb.kg 11.06.2026 (demo snapshot)
export const CURRENCY_RATES = [
  { code: 'USD', flag: '🇺🇸', buy: 87.4, sell: 87.8 },
  { code: 'EUR', flag: '🇪🇺', buy: 100.6, sell: 101.6 },
  { code: 'RUB', flag: '🇷🇺', buy: 1.19, sell: 1.23 },
  { code: 'KZT', flag: '🇰🇿', buy: 0.17, sell: 0.19 },
] as const;

export type CurrencyRate = typeof CURRENCY_RATES[number];

// ── Loans (dcb.kg/ru/credits) ───────────────────────────────────────────────

export interface LoanProduct {
  id: string;
  name: Localized;
  desc: Localized;
  badge?: Localized;
}

export const LOAN_PRODUCTS: LoanProduct[] = [
  {
    id: 'fast',
    name: { ru: 'Быстрый кредит', kg: 'Тез насыя', en: 'Quick Loan' },
    desc: { ru: 'Кредит на любые цели с минимальным пакетом документов', kg: 'Минималдуу документтер пакети менен каалаган максатка насыя', en: 'Loan for any purpose with minimal paperwork' },
  },
  {
    id: 'consumer',
    name: { ru: 'Потребительский кредит', kg: 'Керектөө насыясы', en: 'Consumer Loan' },
    desc: { ru: 'От 5 000 до 12 000 000 сом, срок 3–60 мес., решение до 5 рабочих дней', kg: '5 000ден 12 000 000 сомго чейин, мөөнөтү 3–60 ай, чечим 5 жумуш күнүнө чейин', en: '5,000 to 12,000,000 KGS, 3–60 months, decision within 5 business days' },
    badge: { ru: 'от 20%', kg: '20%дан', en: 'from 20%' },
  },
  {
    id: 'business',
    name: { ru: 'Бизнес кредит', kg: 'Бизнес насыя', en: 'Business Loan' },
    desc: { ru: 'В сомах, USD, RUB, EUR и KZT на срок от 3 до 36 месяцев', kg: 'Сом, USD, RUB, EUR жана KZT менен 3төн 36 айга чейин', en: 'In KGS, USD, RUB, EUR and KZT for 3 to 36 months' },
  },
  {
    id: 'mobile',
    name: { ru: 'Мобильный кредит', kg: 'Мобилдик насыя', en: 'Mobile Loan' },
    desc: { ru: 'Оформление прямо в приложении DCB 360 без визита в банк', kg: 'Банкка барбастан DCB 360 колдонмосунда жол-жоболоштуруу', en: 'Apply directly in the DCB 360 app, no branch visit' },
  },
  {
    id: 'mortgage',
    name: { ru: 'Ипотека', kg: 'Ипотека', en: 'Mortgage' },
    desc: { ru: 'Кредит на покупку жилья с залогом приобретаемой недвижимости', kg: 'Сатылып алынуучу турак жайды күрөөгө коюу менен насыя', en: 'Housing loan secured by the purchased property' },
  },
  {
    id: 'eco',
    name: { ru: 'Эко-кредиты', kg: 'Эко-насыялар', en: 'Eco Loans' },
    desc: { ru: 'Экодом, Экоавто, Экоагро и Экотуризм — льготные зелёные ставки', kg: 'Экоүй, Экоавто, Экоагро жана Экотуризм — жеңилдетилген жашыл ставкалар', en: 'EcoHome, EcoCar, EcoAgro and EcoTourism with preferential green rates' },
    badge: { ru: 'DCB Green', kg: 'DCB Green', en: 'DCB Green' },
  },
];

// Consumer loan rate ladder (verbatim from dcb.kg)
export const CONSUMER_LOAN_LADDER = [
  { amount: '5 000 – 150 000', rate: '26,9%', term: '3–24' },
  { amount: '150 001 – 500 000', rate: '25–26,9%', term: '3–36' },
  { amount: '500 001 – 1 000 000', rate: '23–24%', term: '3–60' },
  { amount: '1 000 001 – 12 000 000', rate: '20–22%', term: '3–60' },
] as const;

// ── Deposits (dcb.kg/ru/deposits) ───────────────────────────────────────────

// «Бай Бол» KGS rates by term, promo 18.05–31.07.2026
export const BAYBOL_RATE_TABLE = [
  { term: '1–2', rate: '3%' },
  { term: '3–5', rate: '6%' },
  { term: '6–8', rate: '9%' },
  { term: '9–10', rate: '11–13%' },
  { term: '11', rate: '14%' },
  { term: '12–60', rate: '13%' },
] as const;

export const DEPOSIT_MIN_AMOUNTS = '1 000 сом · 50 USD · 50 EUR · 1 000 RUB · 5 000 KZT';

// ── Cards (dcb.kg/ru/card) ──────────────────────────────────────────────────

export interface CardProduct {
  id: string;
  name: Localized;
  fee: Localized;
  validity: Localized;
  desc: Localized;
}

export const CARD_PRODUCTS: CardProduct[] = [
  {
    id: 'elcart',
    name: { ru: 'Элкарт DCB', kg: 'Элкарт DCB', en: 'Elcart DCB' },
    fee: { ru: '100–200 сом', kg: '100–200 сом', en: '100–200 KGS' },
    validity: { ru: '3–5 лет', kg: '3–5 жыл', en: '3–5 years' },
    desc: { ru: 'До 2 карт на счёт, включая детей от 16 лет. Оплата через приложение ELCART', kg: 'Бир эсепке 2 картага чейин, 16 жаштан балдарды кошкондо. ELCART колдонмосу аркылуу төлөм', en: 'Up to 2 cards per account, including children 16+. Payments via ELCART app' },
  },
  {
    id: 'pension',
    name: { ru: 'Карта пенсионера', kg: 'Пенсионер картасы', en: 'Pensioner Card' },
    fee: { ru: 'Бесплатно', kg: 'Акысыз', en: 'Free' },
    validity: { ru: '3 года', kg: '3 жыл', en: '3 years' },
    desc: { ru: 'Получение пенсии, бесплатное снятие в банкоматах партнёрской сети', kg: 'Пенсия алуу, өнөктөш тармактын банкоматтарынан акысыз накталай алуу', en: 'Pension payouts, free withdrawals at partner network ATMs' },
  },
  {
    id: 'social',
    name: { ru: 'Социальные выплаты', kg: 'Социалдык төлөмдөр', en: 'Social Benefits' },
    fee: { ru: 'Бесплатно', kg: 'Акысыз', en: 'Free' },
    validity: { ru: '3 года', kg: '3 жыл', en: '3 years' },
    desc: { ru: 'Пособия и соцвыплаты, 3% годовых на остаток по счёту', kg: 'Жөлөкпулдар жана соцтөлөмдөр, эсеп калдыгына жылдык 3%', en: 'Benefits and social payments, 3% p.a. on account balance' },
  },
  {
    id: 'kids',
    name: { ru: 'DCB KIDS', kg: 'DCB KIDS', en: 'DCB KIDS' },
    fee: { ru: 'Бесплатно', kg: 'Акысыз', en: 'Free' },
    validity: { ru: '3 года', kg: '3 жыл', en: '3 years' },
    desc: { ru: 'Детская карта — учит ребёнка управлять финансами', kg: 'Балдар картасы — баланы каржыны башкарууга үйрөтөт', en: "Children's card — teaches kids to manage money" },
  },
];

// ── Transfers (dcb.kg/ru/money-transfer) ────────────────────────────────────

export interface TransferSystem {
  name: string;
  coverage: Localized;
  currencies: string;
}

export const TRANSFER_SYSTEMS: TransferSystem[] = [
  { name: 'Золотая Корона', coverage: { ru: '170+ стран мира', kg: 'Дүйнөнүн 170+ өлкөсү', en: '170+ countries' }, currencies: 'KGS · USD · RUB · EUR' },
  { name: 'SWIFT', coverage: { ru: 'По всему миру', kg: 'Бүткүл дүйнө боюнча', en: 'Worldwide' }, currencies: 'USD · EUR · RUB · KZT' },
  { name: 'Western Union', coverage: { ru: 'Ближнее и дальнее зарубежье', kg: 'Жакынкы жана алыскы чет өлкөлөр', en: 'Near and far abroad' }, currencies: 'RUB · USD' },
  { name: 'Ria', coverage: { ru: 'Ближнее и дальнее зарубежье', kg: 'Жакынкы жана алыскы чет өлкөлөр', en: 'Near and far abroad' }, currencies: 'USD · EUR' },
  { name: 'UPT', coverage: { ru: 'Турция, Грузия', kg: 'Түркия, Грузия', en: 'Turkey, Georgia' }, currencies: 'USD · EUR' },
  { name: 'Kwikpay', coverage: { ru: 'Страны СНГ', kg: 'КМШ өлкөлөрү', en: 'CIS countries' }, currencies: 'RUB · USD' },
  { name: 'MoneyGram', coverage: { ru: 'По всему миру', kg: 'Бүткүл дүйнө боюнча', en: 'Worldwide' }, currencies: 'USD · EUR' },
  { name: 'Sendy · Astrasend · БЭСТ', coverage: { ru: 'СНГ и Азия', kg: 'КМШ жана Азия', en: 'CIS and Asia' }, currencies: 'KGS · RUB · USD' },
];

// ── Business (dcb.kg/ru/yuridichecskiye-litsa) ──────────────────────────────

export interface BusinessService {
  id: string;
  name: Localized;
  highlight: Localized;
  desc: Localized;
}

export const BUSINESS_SERVICES: BusinessService[] = [
  {
    id: 'rko',
    name: { ru: 'Расчётно-кассовое обслуживание', kg: 'Эсептешүү-касса тейлөөсү', en: 'Settlement & Cash Services' },
    highlight: { ru: 'счёт от 15 минут', kg: 'эсеп 15 мүнөттөн', en: 'account from 15 min' },
    desc: { ru: 'Счёт + ККМ для ИП и ОсОО — бесплатно', kg: 'ЖИ жана ЖЧКлар үчүн эсеп + ККМ — акысыз', en: 'Account + cash register for entrepreneurs and LLCs — free' },
  },
  {
    id: 'qr',
    name: { ru: 'QR-платежи и POS-терминалы', kg: 'QR-төлөмдөр жана POS-терминалдар', en: 'QR Payments & POS Terminals' },
    highlight: { ru: '0 сом', kg: '0 сом', en: '0 KGS' },
    desc: { ru: 'За подключение и обслуживание', kg: 'Туташтыруу жана тейлөө үчүн', en: 'For connection and maintenance' },
  },
  {
    id: 'overdraft',
    name: { ru: 'Бизнес-овердрафт', kg: 'Бизнес-овердрафт', en: 'Business Overdraft' },
    highlight: { ru: '3–24 мес.', kg: '3–24 ай', en: '3–24 months' },
    desc: { ru: 'Оборотные средства без залога под движение по счёту', kg: 'Эсеп жүгүртүүсүнө карата күрөөсүз жүгүртүү каражаттары', en: 'Working capital without collateral, based on account turnover' },
  },
  {
    id: 'guarantee',
    name: { ru: 'Банковские гарантии', kg: 'Банктык кепилдиктер', en: 'Bank Guarantees' },
    highlight: { ru: 'тендеры и контракты', kg: 'тендерлер жана контракттар', en: 'tenders and contracts' },
    desc: { ru: 'Тендерные, платёжные и гарантии исполнения обязательств', kg: 'Тендердик, төлөм жана милдеттенмелерди аткаруу кепилдиктери', en: 'Tender, payment and performance guarantees' },
  },
];

// ── Promos (dcb.kg/ru/propose-list) ─────────────────────────────────────────

export interface Promo {
  id: string;
  title: Localized;
  desc: Localized;
  tag: Localized;
  href: string;
}

export const PROMOS: Promo[] = [
  {
    id: 'baybol14',
    title: { ru: 'Депозит «Бай Бол» — 14% годовых', kg: '«Бай Бол» аманаты — жылдык 14%', en: '"Bai Bol" Deposit — 14% p.a.' },
    desc: { ru: 'Повышенная ставка на срок 11 месяцев. Акция до 31.07.2026', kg: '11 айга жогорулатылган ставка. Акция 31.07.2026га чейин', en: 'Boosted rate for an 11-month term. Offer valid until 31.07.2026' },
    tag: { ru: 'Акция', kg: 'Акция', en: 'Promo' },
    href: '#deposits',
  },
  {
    id: 'qr0',
    title: { ru: 'QR и POS-терминалы — 0 сом', kg: 'QR жана POS-терминалдар — 0 сом', en: 'QR & POS Terminals — 0 KGS' },
    desc: { ru: 'Подключение и обслуживание для бизнеса бесплатно', kg: 'Бизнес үчүн туташтыруу жана тейлөө акысыз', en: 'Free connection and maintenance for business' },
    tag: { ru: 'Бизнесу', kg: 'Бизнеске', en: 'Business' },
    href: '#products',
  },
  {
    id: 'rassrochka',
    title: { ru: 'Рассрочка 0%', kg: 'Бөлүп төлөө 0%', en: '0% Installments' },
    desc: { ru: 'Покупки у партнёров банка без переплаты', kg: 'Банктын өнөктөштөрүнөн ашыкча төлөмсүз сатып алуулар', en: 'Purchases from bank partners with no overpayment' },
    tag: { ru: 'Покупки', kg: 'Сатып алуу', en: 'Shopping' },
    href: '#products',
  },
  {
    id: 'wechat',
    title: { ru: 'Переводы в Китай на WeChat', kg: 'Кытайга WeChat аркылуу которуу', en: 'Transfers to China via WeChat' },
    desc: { ru: 'Прямые переводы на кошелёк WeChat (Weixin)', kg: 'WeChat (Weixin) капчыгына түз которуулар', en: 'Direct transfers to a WeChat (Weixin) wallet' },
    tag: { ru: 'Переводы', kg: 'Которуулар', en: 'Transfers' },
    href: '#products',
  },
  {
    id: 'overdraft',
    title: { ru: 'Бизнес-овердрафт', kg: 'Бизнес-овердрафт', en: 'Business Overdraft' },
    desc: { ru: 'Оборотные средства на 3–24 месяца', kg: '3–24 айга жүгүртүү каражаттары', en: 'Working capital for 3–24 months' },
    tag: { ru: 'Бизнесу', kg: 'Бизнеске', en: 'Business' },
    href: '#products',
  },
];

// ── News (styled after dcb.kg/ru/news) ──────────────────────────────────────

export interface NewsItem {
  date: string;
  title: Localized;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    date: '09.06.2026',
    title: { ru: 'Уведомление о временном техническом перерыве в работе круглосуточных сберегательных касс', kg: 'Тегерек сааттык аманат кассаларынын ишиндеги убактылуу техникалык тыныгуу жөнүндө билдирүү', en: 'Notice of temporary technical maintenance of 24/7 savings offices' },
  },
  {
    date: '05.06.2026',
    title: { ru: 'Публикация о выплате процентных доходов по зелёным облигациям', kg: 'Жашыл облигациялар боюнча пайыздык кирешелерди төлөө жөнүндө жарыялоо', en: 'Publication on interest payments on green bonds' },
  },
  {
    date: '02.06.2026',
    title: { ru: 'Подведены итоги акции «Бонус к переводу» с розыгрышем электромобилей', kg: 'Электромобилдер ойнотулган «Которууга бонус» акциясынын жыйынтыгы чыгарылды', en: 'Results of the "Transfer Bonus" campaign with electric car prize draw' },
  },
  {
    date: '25.05.2026',
    title: { ru: 'Банк принял участие в спортивном мероприятии «Национальный дух — мировые высоты»', kg: 'Банк «Улуттук рух — дүйнөлүк бийиктиктер» спорттук иш-чарасына катышты', en: 'The bank took part in the "National Spirit — World Heights" sports event' },
  },
];

// ── FAQ (DCB Гид, dcb.kg/ru/gid) ────────────────────────────────────────────

export interface FaqItem {
  q: Localized;
  a: Localized;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: { ru: 'Каким способом можно оплатить кредит?', kg: 'Насыяны кандай жол менен төлөсө болот?', en: 'How can I repay a loan?' },
    a: { ru: 'В любом отделении банка, через банкоматы с функцией приёма наличных, в приложении DCB 360 или круглосуточных сберегательных кассах.', kg: 'Банктын каалаган бөлүмүндө, накталай кабыл алуу функциясы бар банкоматтарда, DCB 360 колдонмосунда же тегерек сааттык аманат кассаларында.', en: 'At any bank branch, via cash-in ATMs, in the DCB 360 app, or at 24/7 savings offices.' },
  },
  {
    q: { ru: 'Может ли оплачивать кредит родственник?', kg: 'Насыяны тууганы төлөй алабы?', en: 'Can a relative repay my loan?' },
    a: { ru: 'Да, погашение кредита может производить любое лицо при наличии номера кредитного договора и паспорта.', kg: 'Ооба, насыя келишиминин номери жана паспорту бар каалаган адам насыяны төлөй алат.', en: 'Yes, anyone can make repayments with the loan agreement number and a passport.' },
  },
  {
    q: { ru: 'Можно ли получить кредит при действующем параллельном кредите?', kg: 'Учурдагы параллель насыя менен насыя алууга болобу?', en: 'Can I get a loan while having another active loan?' },
    a: { ru: 'Да, при достаточной платёжеспособности. Решение принимает кредитный комитет в срок до 5 рабочих дней.', kg: 'Ооба, жетиштүү төлөө жөндөмдүүлүгү болсо. Чечимди насыя комитети 5 жумуш күнүнө чейин кабыл алат.', en: 'Yes, subject to sufficient solvency. The credit committee decides within 5 business days.' },
  },
  {
    q: { ru: 'Можно ли снять часть основной суммы депозита?', kg: 'Аманаттын негизги суммасынын бир бөлүгүн алууга болобу?', en: 'Can I withdraw part of the deposit principal?' },
    a: { ru: 'Частичное снятие возможно только в пределах накопленных процентов. Снятие основной суммы — через расторжение договора; при закрытии раньше 12 месяцев проценты пересчитываются по ставке вклада «до востребования».', kg: 'Жарым-жартылай алуу топтолгон пайыздардын чегинде гана мүмкүн. Негизги сумманы алуу — келишимди бузуу аркылуу; 12 айдан эрте жабылса, пайыздар «талап боюнча» аманаттын ставкасы менен кайра эсептелет.', en: 'Partial withdrawals are limited to accrued interest. Withdrawing principal requires contract termination; closing before 12 months recalculates interest at the demand-deposit rate.' },
  },
  {
    q: { ru: 'Застрахованы ли вклады?', kg: 'Аманаттар камсыздандырылганбы?', en: 'Are deposits insured?' },
    a: { ru: 'Да, вклады защищены Агентством по защите депозитов КР на сумму до 1 000 000 сом на одного вкладчика.', kg: 'Ооба, аманаттар КР Депозиттерди коргоо агенттиги тарабынан бир аманатчыга 1 000 000 сомго чейин корголот.', en: 'Yes, deposits are protected by the Deposit Protection Agency of the Kyrgyz Republic up to 1,000,000 KGS per depositor.' },
  },
  {
    q: { ru: 'Можно ли пополнить депозит, не приходя в банк?', kg: 'Банкка келбестен аманатты толуктоого болобу?', en: 'Can I top up a deposit without visiting the bank?' },
    a: { ru: 'Да — через приложение DCB 360, интернет-банкинг или круглосуточные сберегательные кассы.', kg: 'Ооба — DCB 360 колдонмосу, интернет-банкинг же тегерек сааттык аманат кассалары аркылуу.', en: 'Yes — via the DCB 360 app, internet banking, or 24/7 savings offices.' },
  },
];

// ── Green partners (dcb.kg/ru/green/list) ───────────────────────────────────

export const GREEN_PARTNERS = [
  'Green Climate Fund', 'USAID', 'Unison Group', 'Senti', 'Tazar',
  'Move Green', 'Green Alliance', 'AIFC', 'Wastenet', 'Pereto',
] as const;

// Branch/department locations live in lib/branches.ts (parsed from dcb.kg).
