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
      text: 'Мы предлагаем несколько кредитных программ:\n• **«Тез»** — быстрый потребительский кредит от 18%\n• **Ипотека** — на жильё от 16%\n• **Автокредит** — от 17%\n\nОформление онлайн за 15 минут. Решение в день обращения.',
      chips: ['Открыть калькулятор', 'Оформить онлайн', 'Связаться с нами'],
    },
    kg: {
      text: 'Биз бир нече кредит программаларын сунуштайбыз:\n• **«Тез»** — 18%дан тез керектөө насыясы\n• **Ипотека** — турак жайга 16%дан\n• **Автокредит** — 17%дан\n\nОнлайн 15 мүнөттө жол-жобалоо. Күнү ичинде чечим.',
      chips: ['Калькуляторду ачуу', 'Онлайн арыз берүү', 'Байланышуу'],
    },
    en: {
      text: 'We offer several loan programs:\n• **"Tez"** — quick consumer loan from 18%\n• **Mortgage** — for housing from 16%\n• **Auto loan** — from 17%\n\nApply online in 15 minutes. Decision on the same day.',
      chips: ['Open Calculator', 'Apply Online', 'Contact Us'],
    },
  },
  deposit: {
    ru: {
      text: '💰 Наш флагманский депозит **«БайБол+»** — **14% годовых**!\n\nТакже доступны:\n• «Бай-Бол» — до 12%\n• Зелёный депозит — до 10%\n\nКапитализация процентов. Срок от 3 до 36 месяцев.',
      chips: ['Открыть депозит', 'Условия «БайБол+»', 'Калькулятор доходности'],
    },
    kg: {
      text: '💰 Биздин флагмандык аманат **«БайБол+»** — **жылдык 14%**!\n\nЗарылчылыктарыңызга жараша:\n• «Бай-Бол» — 12%га чейин\n• Жашыл аманат — 10%га чейин\n\nПайыздарды капиталдаштыруу. Мөөнөт 3дөн 36 айга чейин.',
      chips: ['Аманат ачуу', '«БайБол+» шарттары', 'Киреше калькулятору'],
    },
    en: {
      text: '💰 Our flagship deposit **"BayBol+"** — **14% per annum**!\n\nAlso available:\n• "Bay-Bol" — up to 12%\n• Green Deposit — up to 10%\n\nInterest capitalization. Term from 3 to 36 months.',
      chips: ['Open Deposit', 'BayBol+ Terms', 'Yield Calculator'],
    },
  },
  currency: {
    ru: {
      text: '💱 Актуальные курсы НБ КР (демо):\n\n• USD: покупка **89.40**, продажа **89.90** сом\n• EUR: покупка **96.20**, продажа **96.90** сом\n• RUB: покупка **1.02**, продажа **1.06** сом\n• KZT: покупка **0.176**, продажа **0.182** сом\n\nВ реальном времени обновляется на сайте.',
      chips: ['Обмен валют', 'Отделения', 'Карты'],
    },
    kg: {
      text: '💱 НБ КР курстары (демо):\n\n• USD: сатып алуу **89.40**, сатуу **89.90** сом\n• EUR: сатып алуу **96.20**, сатуу **96.90** сом\n• RUB: сатып алуу **1.02**, сатуу **1.06** сом\n• KZT: сатып алуу **0.176**, сатуу **0.182** сом\n\nВебсайтта чыныгы убакытта жаңыртылат.',
      chips: ['Валюта алмашуу', 'Бөлүмдөр', 'Карталар'],
    },
    en: {
      text: '💱 Current NBKR rates (demo):\n\n• USD: buy **89.40**, sell **89.90** KGS\n• EUR: buy **96.20**, sell **96.90** KGS\n• RUB: buy **1.02**, sell **1.06** KGS\n• KZT: buy **0.176**, sell **0.182** KGS\n\nUpdated in real time on the website.',
      chips: ['Currency Exchange', 'Branches', 'Cards'],
    },
  },
  card: {
    ru: {
      text: '💳 Карты Дос-Кредобанк:\n\n• **Visa Classic/Gold** — международные платежи\n• **Elcard** — национальная платёжная система\n\nБесконтактная оплата, QR, управление через DCB 360. Доставка на дом.',
      chips: ['Заказать карту', 'DCB 360', 'Тарифы'],
    },
    kg: {
      text: '💳 Дос-Кредобанктын карталары:\n\n• **Visa Classic/Gold** — эл аралык төлөмдөр\n• **Elcard** — улуттук төлөм системасы\n\nБайланышсыз төлөм, QR, DCB 360 аркылуу башкаруу. Үйгө жеткирүү.',
      chips: ['Карта заказдоо', 'DCB 360', 'Тарифтер'],
    },
    en: {
      text: '💳 Dos-Credobank Cards:\n\n• **Visa Classic/Gold** — international payments\n• **Elcard** — national payment system\n\nContactless payment, QR, management via DCB 360. Home delivery.',
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
      text: '🔄 Переводы в Дос-Кредобанк:\n\n• Внутри банка — мгновенно\n• По Кыргызстану через Элкарт\n• **WeChat Transfer** для Китая 🇨🇳\n• SWIFT — международные\n\nВсё через мобильное приложение DCB 360.',
      chips: ['DCB 360', 'Тарифы переводов', 'WeChat для Китая'],
    },
    kg: {
      text: '🔄 Дос-Кредобанктагы которуулар:\n\n• Банк ичинде — дароо\n• Элкарт аркылуу Кыргызстан боюнча\n• 🇨🇳 **WeChat Transfer** Кытай үчүн\n• SWIFT — эл аралык\n\nБардыгы DCB 360 мобилдик колдонмосу аркылуу.',
      chips: ['DCB 360', 'Которуу тарифтери', 'Кытайга WeChat'],
    },
    en: {
      text: '🔄 Transfers at Dos-Credobank:\n\n• Within the bank — instant\n• Across Kyrgyzstan via Elcard\n• **WeChat Transfer** for China 🇨🇳\n• SWIFT — international\n\nAll via the DCB 360 mobile app.',
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
