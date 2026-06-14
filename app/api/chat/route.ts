import Anthropic from '@anthropic-ai/sdk';
import type { Lang } from '@/lib/i18n';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Model is overridable without a code change — set DCB_CHAT_MODEL to
// claude-sonnet-4-6 / claude-haiku-4-5 for lower latency and cost.
const MODEL = process.env.DCB_CHAT_MODEL ?? 'claude-opus-4-8';

// Knowledge base — the assistant answers only from these facts (lightweight RAG
// grounding). Kept stable so the system prompt prefix caches across requests.
const KNOWLEDGE = `
БАНК: ОАО «Дос-Кредобанк» (Dos-Credobank), Кыргызстан, работает с 1997 года. Лицензия НБ КР №037.
Головной офис: г. Бишкек, пр. Чуй 92, 6 этаж. Колл-центр: 8686 (бесплатно, круглосуточно). Email: office@doscredobank.kg.
Языки обслуживания: русский, кыргызский, английский.

КРЕДИТЫ:
- Потребительский: 5 000–12 000 000 сом, ставка 20–26,9% годовых, срок 3–60 мес. Решение до 5 рабочих дней. Аннуитетные платежи. Валюта сом или USD.
  Лестница ставок: 5 000–150 000 → 26,9%; 150 001–500 000 → 25–26,9%; 500 001–1 000 000 → 23–24%; 1 000 001–12 000 000 → 20–22%.
- Быстрый кредит — на любые цели. Бизнес кредит — 3–36 мес., мультивалютный (сом/USD/RUB/EUR/KZT).
- Мобильный кредит — оформление в приложении DCB 360. Ипотека. Эко-кредиты (DCB Green): Экодом, Экоавто, Экоагро, Экотуризм.

ДЕПОЗИТЫ (вклады застрахованы до 1 000 000 сом — Агентство по защите депозитов КР):
- «Бай Бол»: до 14% годовых на срок 11 месяцев (акция до 31.07.2026). Ставки сом: 1–2 мес 3%, 3–5 мес 6%, 6–8 мес 9%, 9–10 мес 11–13%, 11 мес 14%, 12–60 мес 13%. Ежемесячная капитализация.
  Минимальный взнос: 1 000 сом / 50 USD / 50 EUR / 1 000 RUB / 5 000 KZT.
- «Бай Бол +» — накопительный. «Жашыл аманат» (зелёный депозит) — до 10%, доступен и юр. лицам.

КАРТЫ (изготовление 7–14 рабочих дней):
- Элкарт DCB — 100–200 сом, до 2 карт на счёт. Карта пенсионера — бесплатно. Социальные выплаты — бесплатно, 3% на остаток. DCB KIDS — детская, бесплатно.
- QR-оплата, приложение ELCART, банкоматы 24/7.

ПЕРЕВОДЫ: Золотая Корона (170+ стран), SWIFT (весь мир), Western Union, Ria, MoneyGram, UPT (Турция/Грузия), Kwikpay (СНГ). Переводы в Китай на кошелёк WeChat.

БИЗНЕСУ: РКО — счёт от 15 минут, счёт + ККМ для ИП/ОсОО бесплатно. QR/POS-терминалы — 0 сом за подключение и обслуживание. Бизнес-овердрафт 3–24 мес. Банковские гарантии. Платформы DCB Business и DCB 360.

ЦИФРОВЫЕ СЕРВИСЫ: DCB 360 (мобильный банк), DCB Business, интернет-банкинг (бесплатное подключение), круглосуточные сберегательные кассы.
`.trim();

const LANG_NAME: Record<Lang, string> = {
  ru: 'русском',
  kg: 'кыргызском',
  en: 'English',
};

function systemPrompt(lang: Lang): string {
  const langInstruction = lang === 'en'
    ? 'Always reply in English.'
    : `Всегда отвечай на ${LANG_NAME[lang]} языке.`;
  return [
    'Ты — AI-консультант банка «Дос-Кредобанк». Отвечай дружелюбно, кратко (2–5 предложений), по делу.',
    langInstruction,
    'Используй только факты из базы знаний ниже. Если точного ответа нет — посоветуй позвонить в колл-центр 8686 (бесплатно, 24/7) или прийти в отделение. Не выдумывай ставки и условия.',
    'Это демо-сайт: реальные операции (оформление заявки, вход в кабинет) не выполняй, а подсказывай, где это сделать.',
    '',
    'БАЗА ЗНАНИЙ:',
    KNOWLEDGE,
  ].join('\n');
}

interface ClientMessage {
  role: 'user' | 'bot';
  text: string;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  // No key configured → signal the client to use its built-in rule-based replies.
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'no_api_key' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { messages?: ClientMessage[]; lang?: Lang };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'bad_request' }), { status: 400 });
  }

  const lang: Lang = body.lang === 'kg' || body.lang === 'en' ? body.lang : 'ru';
  const history = (body.messages ?? []).filter(m => m.text.trim().length > 0);
  if (history.length === 0) {
    return new Response(JSON.stringify({ error: 'empty' }), { status: 400 });
  }

  const messages: Anthropic.MessageParam[] = history.map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));
  // The API requires the conversation to start with a user turn.
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: 'empty' }), { status: 400 });
  }

  const client = new Anthropic({ apiKey });
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 1024,
    system: [{ type: 'text', text: systemPrompt(lang), cache_control: { type: 'ephemeral' } }],
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
