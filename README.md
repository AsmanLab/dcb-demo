# Дос-Кредобанк — демо корпоративного сайта

Демо-редизайн сайта **ОАО «Дос-Кредобанк» (dcb.kg)**, подготовленный **APRD Agency** для презентации проекта.
Это **дизайн-прототип** (данные захардкожены, без реальных банковских API) — цель показать уровень и возможности.

🔗 **Live:** https://dcb-demo.vercel.app

## Возможности
- Mobile-first, фирменный красный + тёмная тема, светлая/тёмная тема
- 3 языка: **RU / KG / EN**
- Рабочий кредитный калькулятор (аннуитетная формула, анимация)
- AI-консультант (скриптовый движок, 3 языка) с fallback на оператора 8686
- Лента курсов валют, продукты, зелёный банкинг, показ приложения DCB 360, карта отделений
- Анимации Framer Motion, доступность (a11y), prefers-reduced-motion

## Стек
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion 12

## Запуск
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-сборка
```

## Деплой
Vercel (production): `npx vercel --prod`

## Структура
- `app/` — layout, страница, глобальные стили (Tailwind v4 `@theme`)
- `components/` — секции и UI (Header, Hero, CreditCalculator, ChatWidget, …)
- `lib/` — `i18n.ts` (словарь RU/KG/EN), `chat.ts` (движок чата), `data.ts` (курсы/отделения)
- `BUILD-SPEC.md` — техническая спецификация демо

---
© ОАО «Дос-Кредобанк» — демо-версия. Разработка: [APRD Agency](https://aprd.kg).
