import { CURRENCY_RATES } from '@/lib/data';

export const runtime = 'nodejs';
// Re-fetch at most once per hour; NBKR publishes daily.
export const revalidate = 3600;

interface Rate { code: string; flag: string; buy: number; sell: number }

const FLAGS: Record<string, string> = { USD: '🇺🇸', EUR: '🇪🇺', RUB: '🇷🇺', KZT: '🇰🇿' };
const WANTED = ['USD', 'EUR', 'RUB', 'KZT'];

// NBKR publishes a single official rate per currency; we derive a small demo
// buy/sell spread around it so the ticker matches the site's two-column layout.
function withSpread(code: string, mid: number): Rate {
  const spread = code === 'KZT' || code === 'RUB' ? 0.02 : 0.2;
  return { code, flag: FLAGS[code] ?? '', buy: +(mid - spread).toFixed(4), sell: +(mid + spread).toFixed(4) };
}

export async function GET() {
  try {
    const res = await fetch('https://www.nbkr.kg/XML/daily.xml', {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(String(res.status));
    const xml = await res.text();

    const rates: Rate[] = [];
    for (const code of WANTED) {
      const block = new RegExp(`<Currency ISOCode="${code}">([\\s\\S]*?)</Currency>`).exec(xml);
      if (!block) continue;
      const valM = /<Value>([\d.,]+)<\/Value>/.exec(block[1]);
      const nomM = /<Nominal>(\d+)<\/Nominal>/.exec(block[1]);
      if (!valM) continue;
      const value = parseFloat(valM[1].replace(',', '.'));
      const nominal = nomM ? parseInt(nomM[1], 10) : 1;
      if (!isFinite(value) || value <= 0) continue;
      rates.push(withSpread(code, value / nominal));
    }

    if (rates.length === WANTED.length) {
      return Response.json({ rates, source: 'nbkr', date: new Date().toISOString().slice(0, 10) });
    }
    throw new Error('incomplete');
  } catch {
    // Fall back to the static snapshot so the ticker always renders.
    return Response.json({ rates: CURRENCY_RATES, source: 'static' });
  }
}
