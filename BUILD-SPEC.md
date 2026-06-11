# DCB Demo — Build Specification (single source of truth)

Demo redesign of **ОАО «Дос-Кредобанк» (dcb.kg)** for a sales meeting. Goal: a deployed,
premium, animated, mobile-first marketing site that makes APRD Agency stand out vs competitors.
This is a **hardcoded design demo** — no real backend. Everything must look alive and polished.

Stack (already scaffolded): Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 (CSS-first
`@theme` in `app/globals.css`) · Framer Motion 12. No `src/` dir; routes under `app/`.

---

## 0. Hard requirements (acceptance)
- `npm run build` MUST pass clean (no type errors, no ESLint errors that fail build).
- Mobile-first: design at 375px first, scale up to 768 / 1024 / 1280 / 1440+.
- Three languages **RU (default) / KG / EN** with a working switcher (client-side, no full i18n lib needed — a typed dictionary + React context).
- **Dark mode default**, with a working light/dark toggle (class strategy on `<html>`).
- Every interactive piece works client-side: calculator, currency tabs, AI chat, language, theme, mobile menu.
- No external network dependency at runtime (currency rates are seeded constants; the chat is scripted). Fonts via `next/font` are fine.
- Accessible: semantic landmarks, `aria-label`s on icon buttons, keyboard-focusable controls, `prefers-reduced-motion` respected.
- All animations subtle and performant (transform/opacity only). Use `framer-motion`'s `whileInView` with `viewport={{ once: true }}`.

---

## 1. Brand & design system

Real DCB brand: red = wealth/speed/energy, grey = technology; logo motif = a **sail (парус)**;
philosophy = Kaizen (continuous improvement). Build a refined fintech interpretation.

Define tokens in `app/globals.css` via `@theme`. Dark is the primary canvas.

```
Brand
--color-brand:        #E4002B   /* primary red */
--color-brand-600:    #C40020
--color-brand-400:    #FF3355
--color-brand-300:    #FF6B82
Accent gradient:      from #FF3355 via #E4002B to #B3001B  (used on 3D icons, hero glow, CTA)
Tech secondary:       #2B6CFF (cool blue, sparingly, for "tech" accents)

Dark surfaces
--bg:        #0A0B0F
--surface:   #12141B
--surface-2: #1A1D27
--border:    rgba(255,255,255,0.08)
--text:      #F4F6FB
--muted:     #9AA3B2

Light surfaces
--bg:        #FFFFFF
--surface:   #F7F8FA
--surface-2: #FFFFFF
--border:    rgba(10,11,15,0.08)
--text:      #0A0B0F
--muted:     #5B6472
```
- Implement dark/light by toggling a `dark` class on `<html>` and switching CSS variables under `.dark`/`:root`. Tailwind v4: configure `@custom-variant dark (&:where(.dark, .dark *))` in globals so `dark:` utilities work with the class.
- Radii: cards `rounded-2xl` (1rem) to `rounded-3xl`; pills `rounded-full`.
- Shadows: soft, colored red glow on primary CTAs and 3D icons (`shadow-[0_10px_40px_-10px_rgba(228,0,43,0.5)]`).
- Glass: `backdrop-blur` + translucent surface for header and floating cards.
- Use a subtle grain/grid or radial red glow in the hero background (CSS gradients, no images needed).

Fonts (next/font/google, **subsets `["latin","cyrillic"]`** — Cyrillic is mandatory):
- Display/headings: `Manrope` (700/800).
- Body/UI: `Inter` (400/500/600).
Expose as `--font-display` / `--font-sans` CSS vars on `<html>`.

3D / product icons: do NOT require real 3D. Simulate "3D-иконки" with layered gradient tiles:
a rounded-2xl tile with the accent gradient, an inset highlight, a soft drop shadow, and a clean
line/emoji-free SVG glyph centered. Add a gentle float/tilt on hover (framer-motion). This reads as
the "3D-иконки" promised in the КП without a heavy 3D engine.

---

## 2. Information architecture

Single rich landing page (`app/page.tsx`) composed of sections, plus a sticky header and footer.
Build as modular client/server components under `components/`. Sections, in order:

1. **Header** (sticky, glass): sail logo mark + "DOSCREDOBANK" wordmark; nav (Кредиты, Депозиты, Карты, Переводы, Бизнесу, О банке) as smooth-scroll anchors; right side: language switcher (RU/KG/EN), theme toggle, phone `8686`, primary button "Войти в DCB 360". Mobile: hamburger → full-screen animated menu.
2. **Hero**: headline + slogan, two CTAs ("Открыть онлайн" primary, "AI-консультант" secondary that opens chat), animated background (red radial glow + faint grid + a stylized sail shape drawn in SVG that subtly animates). A floating "phone/app card" mockup on the right (on desktop) showing a mini balance/cards UI. A live currency ticker strip pinned under the hero.
3. **Trust bar**: row of stats — `24/7` поддержка · `8686` колл-центр · Лицензия НБ КР `№037` · `3` языка · `100+` отделений и банкоматов. (Round, marketing-safe numbers — do NOT invent precise client counts.)
4. **Products grid** (`#products`): 6 cards with simulated 3D icons — Кредиты, Депозиты, Карты, Переводы, Бизнесу, QR/POS-эквайринг. Each: title, 1-line desc, "Подробнее →". Stagger-in on scroll, hover lift+tilt.
5. **Credit calculator** (`#credit`): interactive. Inputs: сумма (slider, 10 000–3 000 000 сом), срок (slider, 3–60 мес), ставка (preset by product, editable 12–28%). Output (animated count-up): ежемесячный платёж, переплата, общая сумма. Use the **annuity formula**: `M = P * r / (1 - (1+r)^-n)`, `r = annualRate/12/100`, `n = months`. Show a small repayment bar. "Оформить заявку" button (opens a fake success toast/modal).
6. **Deposits** (`#deposits`): highlight «БайБол+» at **14% годовых** + «Бай-Бол» + зелёные депозиты. A small deposit yield calc is a bonus, not required.
7. **AI assistant feature** (`#ai`): marketing section describing the 24/7 AI-консультант (RAG, 3 языка, 80% вопросов без оператора) with a "Спросить ассистента" button that opens the chat widget. Show 3-4 example chat bubbles as a preview.
8. **Green banking** (`#green`): real differentiator — зелёные кредиты (эко-дом, эко-авто, эко-агро, эко-туризм) and зелёные депозиты. Eco visual accent (a tasteful green tint allowed here only).
9. **Mobile app** (`#app`): DCB 360 / Simbank showcase — phone mockup + feature list (переводы, оплата, QR, контроль карт), App Store / Google Play badges (text/SVG, not real links).
10. **Branches & ATMs** (`#map`): a stylized map panel (CSS/SVG, not a real Google Map) with filter pills (Отделения / Банкоматы / Обмен валют / 24/7) and a couple of sample location cards. Mention "Google Maps в проде".
11. **CTA band**: "Откройте продукт онлайн за 15 минут" + phone `8686` + button.
12. **Footer**: columns (Продукты, Банк, Поддержка, Языки), contacts (Бишкек, проспект Чуй 92, 6 этаж · office@doscredobank.kg · 8686), license НБ КР №037, slogan, "© 2026 ОАО «Дос-Кредобанк». Демо-версия. Разработка: APRD Agency". Add a small tasteful "Демо APRD" ribbon somewhere so it's clear who built it.

**Floating AI chat widget** (fixed bottom-right): launcher button with red glow + subtle pulse; opens a chat panel with header, scrollable messages, quick-reply chips, input. Scripted engine (see §4). Trilingual. Typing indicator before each bot reply (~600ms) for realism.

---

## 3. i18n

- `lib/i18n.ts`: `type Lang = 'ru'|'kg'|'en'`; a `dict` object keyed by string id with `{ru,kg,en}`.
- `LanguageProvider` (React context) + `useT()` hook returning the active-language string. Persist choice to `localStorage`. Default `ru`.
- Provide full RU. Provide KG and EN for: nav, all section headings/subheadings, buttons, product names, trust stats, calculator labels, chat UI, footer. For long paragraph body copy, KG/EN may be a faithful translation (write real translations, not lorem). Keep it credible — a banker will read the Kyrgyz.
- Real Kyrgyz nav terms to use: Насыялар (Кредиты), Аманаттар (Депозиты), Которуулар (Переводы), Карталар (Карты), Бизнеске (Бизнесу), Банк жөнүндө (О банке). Slogan KG: «Сиздин ыңгайлуулугуңуз үчүн күнү-түнү иштейбиз!».

---

## 4. AI chat engine (scripted, must feel smart)

`lib/chat.ts`: a keyword/intent matcher. Input: user text + lang → returns a response + optional quick-reply chips. Intents (each answered in ru/kg/en):
- **greeting** (привет/салам/hello) → intro + offers chips: [Кредиты] [Депозиты] [Курсы валют] [Отделения].
- **credit** (кредит/насыя/loan/тез/ипотека) → describe «Тез»/потребительский/ипотека, ставки от ~18%, "оформить онлайн за 15 минут", chip [Открыть калькулятор].
- **deposit** (депозит/вклад/аманат/байбол) → «БайБол+ 14% годовых», условия, chip [Открыть депозит].
- **currency / rates** (курс/доллар/валюта/rate/usd) → show seeded USD/EUR/RUB/KZT buy/sell, note "обновляется в реальном времени в проде".
- **card** (карта/карты/card) → Visa/Elcard, заказ и доставка, QR-оплата.
- **branch / atm** (отделение/банкомат/адрес/где) → Бишкек, Чуй 92; 100+ точек; колл-центр 8686.
- **transfer** (перевод/которуу/wechat/китай) → переводы, в т.ч. WeChat в Китай.
- **human / operator** (оператор/человек/call) → предлагает соединить с оператором / позвонить 8686 / оставить заявку (this is the КП "fallback to live operator").
- **fallback** (no match) → polite "переформулируйте" + the same offer chips. Also append a soft "this is a demo" note only in a subtle way, not on every message.
Keep replies concise (2-4 lines), friendly, professional, with the bank's voice. Seed 3-4 starter messages/quick replies when the chat opens.

---

## 5. Currency data (seeded)
`lib/data.ts` constant, plausible KGS rates (label "Курсы НБ КР · демо"):
USD 89.40 / 89.90 · EUR 96.20 / 96.90 · RUB 1.02 / 1.06 · KZT 0.176 / 0.182 (buy/sell). Reuse in hero ticker, currency section, and chat.

---

## 6. Components checklist (suggested files)
`components/Header.tsx`, `MobileMenu.tsx`, `Hero.tsx`, `CurrencyTicker.tsx`, `TrustBar.tsx`,
`Products.tsx`, `Product3DIcon.tsx`, `CreditCalculator.tsx`, `Deposits.tsx`, `AISection.tsx`,
`GreenBanking.tsx`, `AppShowcase.tsx`, `BranchMap.tsx`, `CTABand.tsx`, `Footer.tsx`,
`ChatWidget.tsx`, `ThemeToggle.tsx`, `LanguageSwitcher.tsx`, `SailLogo.tsx`, `Section.tsx` (wrapper),
`AnimatedNumber.tsx`. Providers in `components/providers.tsx` (Theme + Language). Mark interactive ones `"use client"`.

## 7. Meta / polish
- `app/layout.tsx`: title "Дос-Кредобанк — Цифровой банк 24/7", description, `lang="ru"`, OpenGraph, theme-color #E4002B. Set fonts. Add the providers + chat widget so they persist.
- Favicon: simple red sail mark is enough (keep default if time-constrained).
- Smooth scroll (`scroll-behavior: smooth` + `scroll-mt` on anchors for the sticky header).
- No console errors. Test by running `npm run build`.
```
