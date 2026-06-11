# DCB Demo — REDESIGN v2 (Bakai-grounded, readable, not "AI-looking")

## Why we are redoing this
Client feedback on v1: **«слишком ИИшный»** (generic AI look) and **text is hard to read, especially on mobile**.
We are re-skinning the existing site to match the visual language of **Bakai Bank (bakai.kg)** — clean, light,
high-contrast, big bold type — while keeping DCB's brand (red + graphite) and all existing functionality.

## STEP 0 — Look at the real reference FIRST (mandatory)
Open and study these images (they are the actual Bakai mobile site):
- `../Dos Credo/image.png` (Bakai desktop hero) — path from project: `C:\Users\Eldar\OneDrive - Engineering College LA\APRD\Projects\Project Ideas\Dos Credo\image.png`
- `C:\Users\Eldar\OneDrive - Engineering College LA\APRD\Projects\Project Ideas\Dos Credo\bakai-ref\slice1.png` … `slice7.png` (full mobile homepage, top→bottom)
Match their composition, spacing, type weight, card style, button style. Do NOT invent a different aesthetic.

## Bakai design DNA to replicate (the important part)
- **LIGHT theme is the DEFAULT.** White `#FFFFFF` / light-grey `#F2F3F5` section backgrounds. Dark text.
- **Contrast is king.** Headlines near-black `#12141B`; body text `#3A4150` (never lighter than `#5B6472` on white). White text only on dark/brand cards. This single change fixes the readability complaint — verify every text/bg pair has strong contrast.
- **Typography:** big, **heavy** geometric sans headings (use `Manrope`/`800`), large sizes (hero h1 ~clamp(2rem,7vw,3.25rem), section h2 ~1.9–2.4rem, bold). Body `Inter` 16–18px, weight 400–500, comfortable line-height (1.6).
- **Cards:** large radius `rounded-3xl` (1.5rem). Soft, minimal shadow (`shadow-[0_2px_16px_rgba(16,18,27,0.06)]`) or 1px light border. Generous padding (p-6/p-8).
- **Buttons:** pill-shaped `rounded-full`, bold label, good tap size (h-12). Primary = solid brand red, white text. Secondary = white/transparent with dark border, dark text.
- **Generous vertical rhythm:** sections `py-14 sm:py-20`, lots of whitespace. No cramped blocks.
- **NO "AI" tropes:** remove neon/red glow shadows, glassmorphism blur, emoji in headings, gradient-on-gradient, faux 3D glow tiles. Keep it flat, clean, confident.

## DCB brand within this system
- **Accent red `#E4002B`** (hover `#C40020`): logo mark, active filter pill, primary buttons, links, small accents, the % / numbers in the calculator. Use it as an ACCENT, not as a background wash.
- **Graphite `#14161D`** (DCB "технологичность" grey): the deep hero/product card backgrounds (Bakai uses navy; we use graphite with red accents — keeps us distinct and on-brand).
- Light surfaces: bg `#FFFFFF`, muted section `#F4F5F7`, border `#E7E9EE`.

## Token changes — `app/globals.css`
Default `:root` = LIGHT. Make `.dark` a redesigned, still-readable dark (graphite bg `#0E1016`, text `#F2F4F8`, body `#AEB6C4`), but the site loads LIGHT by default now (update the inline theme script in `layout.tsx` to default to `light` when no localStorage value).
```
:root (light, default)
--bg:#FFFFFF --surface:#F4F5F7 --surface-2:#FFFFFF
--text:#12141B --muted:#3A4150 --border:#E7E9EE
--card-dark:#14161D     /* deep graphite card bg */
brand stays #E4002B / #C40020
```
Keep `@custom-variant dark`. Remove the grain/glow utilities; keep a subtle utility only if clean.

## Section-by-section restyle (keep content & i18n keys; restyle only)
1. **Header** — white, sticky, 1px bottom border (no heavy glass blur). DCB sail logo + wordmark in graphite, the sail mark in red. Nav links graphite, hover red. Right: language pill (RU/KG/EN), theme toggle, phone `8686`, red pill CTA "Войти в DCB 360". Clean, like Bakai's header.
2. **Hero** — a large `rounded-3xl` **graphite card** (not full-bleed dark page), inset within the white page with margin. Big bold WHITE headline + readable white/light subtext + slogan, white pill primary "Открыть онлайн" + outlined "AI-консультант". Slider dots. A clean product/app mock image on the right (desktop). Currency ticker as a thin clean strip BELOW the hero card (light bg, dark text, red deltas). Remove all glow.
3. **Trust bar** — simple light strip: bold near-black numbers + grey labels (24/7 · 8686 · НБ КР №037 · 3 языка · 100+ отделений). High contrast, no cards-with-glow.
4. **Products** ("Наши продукты") — Bakai pattern: centered bold h2, **pill filter tabs** (Все/Кредиты/Депозиты/Карты/Бизнес — active = red pill, rest grey text), then a row of **large product cards** (graphite or white) each with a big title, short line, clean line-icon or simple 3D image, and a pill "Подробнее". Horizontal scroll on mobile (snap), grid on desktop.
5. **Credit calculator** — clean white card, big readable labels, red range sliders (`accent-[#E4002B]`), big near-black result numbers (keep AnimatedNumber + annuity math), red primary pill "Оформить заявку". Lots of padding. Make sure labels/values are high-contrast.
6. **Deposits / "Ваши накопления"** — Bakai "Your Savings" pattern: light cards with dark heading «БайБол+ 14%», grey subtext, outlined dark pill button, simple icon. Highlight 14% in red.
7. **AI section** — light section; a clean preview of the chat (real-looking bubbles, high contrast) + bold heading + red pill "Спросить ассистента". No glow.
8. **Green banking** — keep, but clean cards (white, green check accents kept minimal), readable.
9. **App showcase** — full **brand-red** `rounded-3xl` card (analog of Bakai's blue app card): white bold "Приложение DCB 360", white subtext, phone mockup, App Store/Google Play badges. This is the one place a big brand-color block is welcome.
10. **Branches/ATM** — clean light card, dark text, pill filters, simple map illustration (keep), readable location cards.
11. **CTA band** — simple graphite or red band, white bold text, white/red pill + phone 8686.
12. **Footer** — Bakai pattern: white, **accordion columns** (Частным лицам / Бизнесу / Важная информация / О банке) with chevrons on mobile, then "Для всех клиентов" hotline **8686**, head office «Бишкек, проспект Чуй 92», compliance line, «© 2026 ОАО «Дос-Кредобанк». Лицензия НБ КР №037. Демо — APRD Agency».

## Keep working (do not break)
Calculator math, trilingual scripted chat, RU/KG/EN switch, theme toggle (default LIGHT), mobile menu, all anchors/smooth-scroll. Respect `prefers-reduced-motion`. Keep animations subtle (fade/slide on scroll), no flashy glow.

## Acceptance
- `npm run build` passes clean.
- Light theme by default; every text/background pair is clearly readable (mentally check at 375px). No emoji headings, no neon glow, no glass blur.
- Looks recognizably in the Bakai family (clean/light/bold/readable), in DCB red+graphite.
