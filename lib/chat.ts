import type { Lang } from './i18n';

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  chips?: string[];
  timestamp: Date;
}

interface BotResponse {
  text: string;
  chips?: string[];
}

const responses: Record<string, Record<Lang, BotResponse>> = {
  greeting: {
    ru: {
      text: 'Привет! 👋 Я AI-консультант Дос-Кредобанк. Помогу с вопросами о кредитах, депозитах, картах и переводах. Чем могу помочь?',
      chips: ['Кредиты', 'Депозиты', 'Курсы валют', 'Отделения'],
    },
    kg: {
      text: 'Салам! 👋 Мен Дос-Кредобанктын AI-кеңешчисимин. Насыялар, аманаттар, карталар жана которуулар боюнча жардам берем. Кандай жардам керек?',
      chips: ['Насыялар', 'Аманаттар', 'Валюта курстары', 'Бөлүмдөр'],
    },
    en: {
      text: "Hello! 👋 I'm the AI assistant of Dos-Credobank. I can help with questions about loans, deposits, cards, and transfers. How can I help?",
      chips: ['Loans', 'Deposits', 'Exchange Rates', 'Branches'],
    },
  },
  credit: {
    ru: {
      text: 'Кредитные программы Дос-Кредобанк:\n• **Потребительский** — от 5 000 до 12 000 000 сом, ставка 20–26,9%, срок 3–60 мес.\n• **Быстрый кредит** — на любые цели\n• **Бизнес кредит** — 3–36 мес., мультивалютный\n• **Ипотека** и **Мобильный кредит** в DCB 360\n\nРешение до 5 рабочих дней.',
      chips: ['Открыть калькулятор', 'Оформить онлайн', 'Связаться с нами'],
    },
    kg: {
      text: 'Дос-Кредобанктын насыя программалары:\n• **Керектөө** — 5 000ден 12 000 000 сомго чейин, ставка 20–26,9%, мөөнөтү 3–60 ай\n• **Тез насыя** — каалаган максатка\n• **Бизнес насыя** — 3–36 ай, мультивалюталык\n• **Ипотека** жана DCB 360до **Мобилдик насыя**\n\nЧечим 5 жумуш күнүнө чейин.',
      chips: ['Калькуляторду ачуу', 'Онлайн арыз берүү', 'Байланышуу'],
    },
    en: {
      text: 'Dos-Credobank loan programs:\n• **Consumer** — 5,000 to 12,000,000 KGS, rate 20–26.9%, term 3–60 months\n• **Quick loan** — for any purpose\n• **Business loan** — 3–36 months, multi-currency\n• **Mortgage** and **Mobile loan** in DCB 360\n\nDecision within 5 business days.',
      chips: ['Open Calculator', 'Apply Online', 'Contact Us'],
    },
  },
  deposit: {
    ru: {
      text: '💰 Депозит **«Бай Бол»** — до **14% годовых** на срок 11 месяцев (акция до 31.07.2026)!\n\nТакже доступны:\n• «Бай Бол +» — накопительный\n• «Жашыл аманат» — зелёный депозит\n\nМинимальный взнос от 1 000 сом. Ежемесячная капитализация. Вклады застрахованы до 1 000 000 сом.',
      chips: ['Открыть депозит', 'Условия «Бай Бол»', 'Калькулятор доходности'],
    },
    kg: {
      text: '💰 **«Бай Бол»** аманаты — 11 айга **жылдык 14%га чейин** (акция 31.07.2026га чейин)!\n\nОшондой эле:\n• «Бай Бол +» — топтоочу\n• «Жашыл аманат» — жашыл депозит\n\nМинималдуу салым 1 000 сомдон. Ай сайын капитализация. Аманаттар 1 000 000 сомго чейин камсыздандырылган.',
      chips: ['Аманат ачуу', '«Бай Бол» шарттары', 'Киреше калькулятору'],
    },
    en: {
      text: '💰 **"Bai Bol"** deposit — up to **14% p.a.** for an 11-month term (promo until 31.07.2026)!\n\nAlso available:\n• "Bai Bol +" — savings deposit\n• "Zhashyl Amanat" — green deposit\n\nMinimum deposit from 1,000 KGS. Monthly capitalization. Deposits insured up to 1,000,000 KGS.',
      chips: ['Open Deposit', 'Bai Bol Terms', 'Yield Calculator'],
    },
  },
  currency: {
    ru: {
      text: '💱 Актуальные курсы (демо, 11.06.2026):\n\n• USD: покупка **87.40**, продажа **87.80** сом\n• EUR: покупка **100.60**, продажа **101.60** сом\n• RUB: покупка **1.19**, продажа **1.23** сом\n• KZT: покупка **0.17**, продажа **0.19** сом\n\nВ реальном времени обновляется на сайте.',
      chips: ['Обмен валют', 'Отделения', 'Карты'],
    },
    kg: {
      text: '💱 Учурдагы курстар (демо, 11.06.2026):\n\n• USD: сатып алуу **87.40**, сатуу **87.80** сом\n• EUR: сатып алуу **100.60**, сатуу **101.60** сом\n• RUB: сатып алуу **1.19**, сатуу **1.23** сом\n• KZT: сатып алуу **0.17**, сатуу **0.19** сом\n\nВебсайтта чыныгы убакытта жаңыртылат.',
      chips: ['Валюта алмашуу', 'Бөлүмдөр', 'Карталар'],
    },
    en: {
      text: '💱 Current rates (demo, 11.06.2026):\n\n• USD: buy **87.40**, sell **87.80** KGS\n• EUR: buy **100.60**, sell **101.60** KGS\n• RUB: buy **1.19**, sell **1.23** KGS\n• KZT: buy **0.17**, sell **0.19** KGS\n\nUpdated in real time on the website.',
      chips: ['Currency Exchange', 'Branches', 'Cards'],
    },
  },
  card: {
    ru: {
      text: '💳 Карты Дос-Кредобанк:\n\n• **Элкарт DCB** — 100–200 сом, до 2 карт на счёт\n• **Карта пенсионера** — бесплатно\n• **Социальные выплаты** — бесплатно, 3% на остаток\n• **DCB KIDS** — детская карта\n\nИзготовление 7–14 рабочих дней. QR-оплата и приложение ELCART.',
      chips: ['Заказать карту', 'DCB 360', 'Тарифы'],
    },
    kg: {
      text: '💳 Дос-Кредобанктын карталары:\n\n• **Элкарт DCB** — 100–200 сом, бир эсепке 2 картага чейин\n• **Пенсионер картасы** — акысыз\n• **Социалдык төлөмдөр** — акысыз, калдыкка 3%\n• **DCB KIDS** — балдар картасы\n\nДаярдоо 7–14 жумуш күнү. QR-төлөм жана ELCART колдонмосу.',
      chips: ['Карта заказдоо', 'DCB 360', 'Тарифтер'],
    },
    en: {
      text: '💳 Dos-Credobank cards:\n\n• **Elcart DCB** — 100–200 KGS, up to 2 cards per account\n• **Pensioner Card** — free\n• **Social Benefits** — free, 3% on balance\n• **DCB KIDS** — children\'s card\n\nProduction 7–14 business days. QR payments and the ELCART app.',
      chips: ['Order Card', 'DCB 360', 'Rates'],
    },
  },
  branch: {
    ru: {
      text: '📍 Наш главный офис: **Бишкек, просп. Чуй 92, 6 этаж**.\n\nСеть 100+ отделений и банкоматов по всему Кыргызстану. Банкоматы 24/7.\n\nКолл-центр: **8686** (бесплатно, круглосуточно).',
      chips: ['Карта отделений', 'Позвонить 8686', 'Режим работы'],
    },
    kg: {
      text: '📍 Биздин башкы офис: **Бишкек, Чүй дан. 92, 6-кабат**.\n\nБүткүл Кыргызстан боюнча 100+ бөлүм жана банкоматтар тармагы. Банкоматтар 24/7.\n\nЧалуу борбору: **8686** (акысыз, тегерек сааттык).',
      chips: ['Бөлүмдөр картасы', '8686 чалуу', 'Иш убактысы'],
    },
    en: {
      text: '📍 Our main office: **Bishkek, Chuy Ave 92, 6th floor**.\n\nNetwork of 100+ branches and ATMs across Kyrgyzstan. ATMs open 24/7.\n\nCall center: **8686** (free, around the clock).',
      chips: ['Branch Map', 'Call 8686', 'Working Hours'],
    },
  },
  transfer: {
    ru: {
      text: '🔄 Переводы в Дос-Кредобанк:\n\n• **Золотая Корона** — 170+ стран\n• **SWIFT** — по всему миру\n• Western Union, Ria, MoneyGram, UPT, Kwikpay\n• **WeChat Transfer** для Китая 🇨🇳\n\nВсё через мобильное приложение DCB 360.',
      chips: ['DCB 360', 'Тарифы переводов', 'WeChat для Китая'],
    },
    kg: {
      text: '🔄 Дос-Кредобанктагы которуулар:\n\n• **Золотая Корона** — 170+ өлкө\n• **SWIFT** — бүткүл дүйнө боюнча\n• Western Union, Ria, MoneyGram, UPT, Kwikpay\n• 🇨🇳 **WeChat Transfer** Кытай үчүн\n\nБардыгы DCB 360 мобилдик колдонмосу аркылуу.',
      chips: ['DCB 360', 'Которуу тарифтери', 'Кытайга WeChat'],
    },
    en: {
      text: '🔄 Transfers at Dos-Credobank:\n\n• **Golden Crown** — 170+ countries\n• **SWIFT** — worldwide\n• Western Union, Ria, MoneyGram, UPT, Kwikpay\n• **WeChat Transfer** for China 🇨🇳\n\nAll via the DCB 360 mobile app.',
      chips: ['DCB 360', 'Transfer Rates', 'WeChat for China'],
    },
  },
  human: {
    ru: {
      text: 'Конечно, соединю вас с живым оператором!\n\n📞 **Колл-центр: 8686** — бесплатно, 24/7\n📧 office@doscredobank.kg\n\nИли оставьте заявку — перезвоним в течение 15 минут.',
      chips: ['Позвонить 8686', 'Оставить заявку', 'Email'],
    },
    kg: {
      text: 'Албетте, сизди тирүү операторго туташтырам!\n\n📞 **Чалуу борбору: 8686** — акысыз, 24/7\n📧 office@doscredobank.kg\n\nЯки арыз калтырыңыз — 15 мүнөт ичинде чалабыз.',
      chips: ['8686 чалуу', 'Арыз калтыруу', 'Email'],
    },
    en: {
      text: "Of course, I'll connect you with a live operator!\n\n📞 **Call center: 8686** — free, 24/7\n📧 office@doscredobank.kg\n\nOr leave a request — we'll call back within 15 minutes.",
      chips: ['Call 8686', 'Leave Request', 'Email'],
    },
  },
  fallback: {
    ru: {
      text: 'Не совсем понял вопрос. Попробуйте переформулировать, или выберите одну из популярных тем:',
      chips: ['Кредиты', 'Депозиты', 'Курсы валют', 'Отделения'],
    },
    kg: {
      text: 'Суроону толук түшүнбөдүм. Кайра сурап көрүңүз же популярдуу темалардын бирин тандаңыз:',
      chips: ['Насыялар', 'Аманаттар', 'Валюта курстары', 'Бөлүмдөр'],
    },
    en: {
      text: "I didn't quite understand the question. Please rephrase, or choose one of the popular topics:",
      chips: ['Loans', 'Deposits', 'Exchange Rates', 'Branches'],
    },
  },
};

const INTENT_PATTERNS: Record<string, RegExp> = {
  greeting: /привет|hello|hi\b|салам|здравствуй|добрый/i,
  deposit: /депозит|вклад|аманат|байбол|bay.?bol|накопит|доходност|yield|киреше/i,
  credit: /кредит|насыя|loan|тез|ипотек|автокред|займ|заем|калькулятор|calculator|оформ|apply/i,
  currency: /курс|валюта|доллар|евро|рубл|тенге|usd|eur|rub|kzt|rate|обмен|алмаш/i,
  card: /карт|card|visa|elcard|mastercard|тариф|rates|заказ/i,
  branch: /отделен|банкомат|адрес|офис|где|atm|branch|бөлүм|address|режим|часы|working|иш убак/i,
  transfer: /перевод|которуу|transfer|wechat|swift|отправ/i,
  human: /оператор|человек|сотрудник|call|позвон|8686|жив|заявк|связ|байланыш|contact|остав|request|email|почта|арыз/i,
};

export function getIntent(text: string): string {
  for (const [intent, pattern] of Object.entries(INTENT_PATTERNS)) {
    if (pattern.test(text)) return intent;
  }
  return 'fallback';
}

export function getBotResponse(text: string, lang: Lang): BotResponse {
  const intent = getIntent(text);
  return responses[intent]?.[lang] ?? responses.fallback[lang];
}

export function getStarterMessage(lang: Lang): ChatMessage {
  return {
    id: 'starter',
    role: 'bot',
    text: responses.greeting[lang].text,
    chips: responses.greeting[lang].chips,
    timestamp: new Date(),
  };
}
