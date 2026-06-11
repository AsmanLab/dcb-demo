# DCB.kg Site Plan — Parsed Content & Build Plan

Source: https://www.dcb.kg/ru/ (parsed 2026-06-11). This document inventories the real Dos-Credobank site and maps it to a build plan for the demo project.

---

## 1. Site Inventory (as parsed)

### 1.1 Identity & Legal

| Item | Value |
|---|---|
| Bank | ОАО «Дос-Кредобанк» (JSC Dos-Credobank), operating since 1997 |
| License | Лицензия НБКР №037 |
| Address | 720000, Кыргызская Республика, г. Бишкек, пр. Чуй 92, 6 этаж |
| Call center | 8686 (toll-free from mobile) |
| Email | office@doscredobank.kg |
| Languages | RU / KG / EN |
| Social | Facebook, Instagram, Twitter (@doscredobank_kg) |

### 1.2 Top-level navigation

- **Частным клиентам** (private clients) — default home
- **Юридическим лицам** (`/ru/yuridichecskiye-litsa/`)
- **Отделения** (`/ru/terminals/departments`)
- **Банкоматы и терминалы** (`/ru/terminals/bankomats`)
- Utility: language switcher (RU/KG/EN), search (`/ru/search`), Интернет-Банкинг login

### 1.3 Credits (Кредиты)

| Product | URL | Key terms |
|---|---|---|
| Быстрый кредит | `/ru/credits/bystryi/` | "кредиты на любые цели" |
| Потребительский кредит | `/ru/credits/potrebitelskiy/` | 5 000 – 12 000 000 сом, 3–60 мес. |
| Бизнес кредит | `/ru/credits/business` | KGS/USD/RUB/EUR/KZT, 3–36 мес. |
| Мобильный кредит | `/ru/credits/mobilniy-kredit` | — |
| Ипотека | `/ru/credits2/ipoteka` | — |
| Эко-кредиты | `/ru/green/detail/eko-kredity/…` | Экотуризм, Экодом, Экоагро, Экоавто |

Consumer loan rate ladder (verbatim):

| Amount (som) | Rate | Term |
|---|---|---|
| 5 000 – 150 000 | 26.9% | 3–24 мес. |
| 150 001 – 500 000 | 25–26.9% | 3–36 мес. |
| 500 001 – 1 000 000 | 23–24% | 3–60 мес. |
| 1 000 001 – 12 000 000 | 20–22% | 3–60 мес. |

Other loan facts: annuity repayment, KGS or USD, decision ≤ 5 business days, collateral: real estate / vehicles / property / guarantees; eligible: employed individuals, farmers, ИП (3+ months operating), pensioners.

### 1.4 Deposits (Депозиты)

| Product | URL | Headline |
|---|---|---|
| «Бай Бол» | `/ru/deposits/baybol` | KGS up to 14% (11 mo.), promo to 31.07.2026 |
| «Бай Бол +» | `/ru/deposits/depozit-baj-bol` | promo seen at 15% (Black Friday offer) |
| «Зелёный» (Жашыл аманат) | `/ru/deposits/Jashyl_amanat` | green-finance deposit, also for legal entities |

«Бай Бол» details: KGS rates 3% (1–2 mo.) → 14% (11 mo.) → 13% (12–60 mo.); also RUB (6–8%) and KZT (1–6%). Min amounts: 1 000 som / 50 USD / 50 EUR / 1 000 RUB / 5 000 KZT. Monthly capitalization. Partial withdrawal: interest only. Early closure < 12 mo. recalculated at demand rate. State insurance up to 1 000 000 som (Агентство по защите депозитов КР).

### 1.5 Cards (Карты) — `/ru/card/`

| Card | Fee | Validity | Notes |
|---|---|---|---|
| Элкарт DCB | 100–200 сом | 3–5 лет | up to 2 cards, children 16+ |
| Карта пенсионера | бесплатно | 3 года | free ATM withdrawal in partner network |
| Социальные выплаты | бесплатно | 3 года | 3% годовых on balance |
| DCB KIDS | бесплатно | — | children's financial literacy |

Issuance 7–14 business days. Features: 24/7 ATM deposit/withdrawal, interest on balance, ELCART mobile app payments. (Elcard national system; demo also references Visa.)

### 1.6 Transfers (Переводы) — `/ru/money-transfer/`

Systems: Золотая Корона (170+ countries, KGS/USD/RUB/EUR), SWIFT (worldwide, RUB/USD/EUR/KZT), Western Union, Ria, UPT (Turkey/Georgia), Kwikpay (CIS), Sendy, Amanat, Astrasend, MoneyGram, БЭСТ. Promo: переводы в Китай на кошелёк WeChat (Weixin); акция «Бонус к переводу» с розыгрышем электромобилей.

### 1.7 Business (Юридическим лицам)

- РКО: счёт от 15 минут; счёт + ККМ для ИП/ОсОО бесплатно
- QR-платежи и POS-терминалы: 0 сом за подключение и обслуживание
- Бизнес кредит: 3–36 мес., мультивалютный
- Бизнес-овердрафт: 3–24 мес.
- Депозиты юр. лиц: срочный, зелёный
- Банковские гарантии (`/ru/bank-garant`)
- DCB Business + DCB 360 digital platforms

### 1.8 Digital services

| Service | Notes |
|---|---|
| Интернет-Банкинг | free connection, no monthly fee; clearing/gross/SWIFT payments, FX ops, SMS; login at onlinenew.doscredobank.kg |
| DCB 360 | retail digital platform / app |
| DCB Business | corporate digital platform |
| Электронный кошелёк | `/ru/ewallet/` |
| Simbank | separate mobile service, simbank.kg |
| Круглосуточные сберегательные кассы | 24/7 self-service savings offices |

### 1.9 Green banking (DCB Green) — `/ru/green/list/`

Eco-loans: Экотуризм, Экодом, Экоагро, Экоавто. Зелёный депозит (retail + legal entities). Green bonds with quarterly coupon payments (news mentions 12th interest period). 20+ green/ecosystem partners: Green Climate Fund, USAID, Senti, Unison Group, Tazar, Move Green, Green Alliance, AIFC/GFC, plus retail partners (Beeline, Sulpak, MStore, Samsung Store…).

### 1.10 Other site sections

- **DCB Гид** (`/ru/gid/top10`) — FAQ hub: credit FAQ, deposit FAQ (anchored Q&A)
- **Спецпредложения** (`/ru/propose-list`) — promo cards: депозит 14%, QR за 0 сом, бизнес-овердрафт, рассрочка 0% (`/ru/rassrochka`), WeChat-переводы
- **Новости** (`/ru/news`) — maintenance notices, holiday schedules, bond disclosures, charity/sport events
- **Сейфовые ячейки** (`/ru/safe-box`)
- **Безопасность** (`/ru/security/`) — «Осторожно, мошенники»
- **О банке** — today, management, awards, financial performance, correspondent network, securities ops, contracts, tariffs, vacancies, property sales, ПФТД/ЛПД, financial literacy
- **Курсы валют** (homepage widget, 11.06.2026): USD 87.40/87.80 · EUR 100.60/101.60 · RUB 1.19/1.23 · KZT 0.17/0.19

---

## 2. Gap Analysis: current demo vs real site

Already in demo: header + mega menu, hero, trust bar, products grid, credit calculator, deposits (БайБол+/Бай-Бол/Зелёный), AI chat, green banking, app showcase (DCB 360), branch map placeholder, currency ticker, CTA band, footer, RU/KG/EN i18n.

Missing or divergent:

| Gap | Real site has | Demo has |
|---|---|---|
| Loan product depth | 6 loan types with rate ladder | one generic "Кредиты" card, 18% placeholder |
| Deposit accuracy | Бай Бол 14% (11 mo.), exact min amounts, insurance | close, but no term/rate table |
| Cards accuracy | Elcart-family cards, fees, DCB KIDS | generic Visa/Elcard card |
| Transfers detail | 11 named systems, WeChat China | one generic card |
| Business section | РКО 15 мин, QR 0 сом, overdraft, guarantees | one generic card |
| Promos/news | спецпредложения + news feed | none |
| DCB Гид (FAQ) | anchored Q&A hub | none (AI chat partially covers) |
| Green depth | eco-loans, green bonds, partner logos | section exists, no products/partners |
| Other | Simbank, e-wallet, safe boxes, security page, rates widget with sale/buy | currency ticker only |

---

## 3. Build Plan

### Phase 1 — Data layer (lib/)
- [x] `lib/data.ts`: replace placeholder numbers with parsed real ones (rate ladder, deposit table, card fees, transfer systems, FX rates with buy/sell).
- [x] Extend `lib/megamenu.ts` with real product names/links from §1.3–1.7.
- [x] i18n keys for all new content (RU source → KG/EN translations).

### Phase 2 — Product detail content
- [x] Loans: cards for 6 types; rate-ladder table on consumer loan; eligibility + collateral bullets.
- [x] Deposits: term/rate table for «Бай Бол», min amounts, insurance badge (1 млн сом).
- [x] Cards: 4 card tiles with fees/validity.
- [x] Transfers: systems grid + WeChat China highlight.
- [x] Business: РКО (от 15 минут), QR/POS 0 сом, overdraft, guarantees.

### Phase 3 — New sections
- [x] Спецпредложения carousel (промо: 14% депозит, QR 0 сом, рассрочка 0%).
- [x] Новости list (3–5 demo items styled after real feed).
- [x] DCB Гид FAQ accordion (reuse parsed FAQ topics; feed same content to AI chat knowledge base in `lib/chat.ts`).
- [x] Green: eco-loan 4-product row + partner logo strip.

### Phase 4 — Polish
- [x] FX widget: buy/sell columns like real site (87.40/87.80 format).
- [x] Security banner («Осторожно, мошенники») link in footer/header.
- [x] Footer: mirror real 3-column structure (Клиентам / О банке / Обратная связь) + socials.
- [x] 24/7 сберкассы trust-bar item (real differentiator).

### Out of scope (demo)
Real internet-banking login, Simbank integration, search, vacancies/financial reports, property sales, ПФТД/ЛПД compliance pages.

---

## 4. Notes
- All rates/promos time-boxed (e.g. «Бай Бол» 14% valid 18.05–31.07.2026) — mark as demo data with date stamp.
- Real site has no Visa emphasis for retail cards — Elcart-centric; adjust demo copy.
- WeChat transfers exist as promo, not core service page — keep as highlight card.
