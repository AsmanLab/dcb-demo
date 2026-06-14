import React from 'react';

// App-style product icons: a soft rounded tile with a gradient + a simple white
// glyph, in the spirit of mobile-banking launchers. Each icon is self-contained
// (unique gradient ids) and sized via the `size` prop.

export type ProductIconName =
  | 'cards' | 'loans' | 'deposits' | 'transfers'
  | 'business' | 'calculator' | 'branches' | 'assistant'
  | 'qr' | 'rates'
  | 'pension' | 'social' | 'kids' | 'account'
  | 'guarantee' | 'globe' | 'leaf' | 'percent';

interface TileProps {
  id: string;
  from: string;
  to: string;
  children: React.ReactNode;
  size: number;
}

function Tile({ id, from, to, children, size }: TileProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="16" fill={`url(#${id}-bg)`} />
      {/* top sheen */}
      <rect x="4" y="4" width="48" height="22" rx="12" fill="white" opacity="0.10" />
      <g stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {children}
      </g>
    </svg>
  );
}

const ICONS: Record<ProductIconName, (size: number) => React.ReactNode> = {
  cards: (s) => (
    <Tile id="ic-cards" from="#5B8DEF" to="#3358D4" size={s}>
      <rect x="16" y="20" width="24" height="17" rx="3" />
      <path d="M16 26h24" />
      <path d="M20 33h5" />
    </Tile>
  ),
  loans: (s) => (
    <Tile id="ic-loans" from="#34C77B" to="#0E9F58" size={s}>
      <rect x="15" y="20" width="26" height="16" rx="3" />
      <circle cx="28" cy="28" r="3.4" />
      <path d="M20 24v0M36 32v0" />
    </Tile>
  ),
  deposits: (s) => (
    <Tile id="ic-deposits" from="#FFC75A" to="#F39200" size={s}>
      <path d="M21 24c-2 1-3.5 3-3.5 5.5C17.5 34 21.5 37 28 37s10.5-3 10.5-7.5c0-4.5-4.5-7.5-10.5-7.5-1.6 0-3.1.2-4.4.6" />
      <circle cx="33" cy="29" r="1.2" fill="white" stroke="none" />
      <path d="M22 22l3 2" />
    </Tile>
  ),
  transfers: (s) => (
    <Tile id="ic-transfers" from="#2DD4BF" to="#0E9488" size={s}>
      <path d="M19 25h17l-4-4" />
      <path d="M37 33H20l4 4" />
    </Tile>
  ),
  business: (s) => (
    <Tile id="ic-business" from="#A06BFF" to="#6D28D9" size={s}>
      <rect x="17" y="24" width="22" height="13" rx="2.5" />
      <path d="M24 24v-2.5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2V24" />
      <path d="M17 29h22" />
    </Tile>
  ),
  calculator: (s) => (
    <Tile id="ic-calc" from="#FF5C72" to="#E4002B" size={s}>
      <rect x="19" y="17" width="18" height="22" rx="3" />
      <path d="M23 22h10" />
      <path d="M23 28h0M28 28h0M33 28h0M23 33h0M28 33h0M33 33h0" />
    </Tile>
  ),
  branches: (s) => (
    <Tile id="ic-branch" from="#3BC9DB" to="#1098AD" size={s}>
      <path d="M28 38s8-6 8-13a8 8 0 1 0-16 0c0 7 8 13 8 13z" />
      <circle cx="28" cy="25" r="3" />
    </Tile>
  ),
  assistant: (s) => (
    <Tile id="ic-ai" from="#FF6B82" to="#C40020" size={s}>
      <path d="M19 24a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-8l-5 4z" />
      <path d="M28 25l1.2 2.3L31 28l-1.8.7L28 31l-1.2-2.3L25 28l1.8-.7z" fill="white" stroke="none" />
    </Tile>
  ),
  qr: (s) => (
    <Tile id="ic-qr" from="#475569" to="#1E293B" size={s}>
      <rect x="18" y="18" width="8" height="8" rx="1.5" />
      <rect x="30" y="18" width="8" height="8" rx="1.5" />
      <rect x="18" y="30" width="8" height="8" rx="1.5" />
      <path d="M31 31h3M37 31v0M31 37h6" />
    </Tile>
  ),
  rates: (s) => (
    <Tile id="ic-rates" from="#22B8CF" to="#0B7285" size={s}>
      <path d="M19 35l5-6 4 3 9-9" />
      <path d="M33 23h4v4" />
    </Tile>
  ),
  pension: (s) => (
    <Tile id="ic-pension" from="#34C77B" to="#0E9F58" size={s}>
      <circle cx="28" cy="22" r="5" />
      <path d="M19 38c0-5 4-8.5 9-8.5s9 3.5 9 8.5" />
    </Tile>
  ),
  social: (s) => (
    <Tile id="ic-social" from="#2DD4BF" to="#0E9488" size={s}>
      <path d="M28 38s-10-6-10-13a5.5 5.5 0 0 1 10-2 5.5 5.5 0 0 1 10 2c0 7-10 13-10 13z" />
    </Tile>
  ),
  kids: (s) => (
    <Tile id="ic-kids" from="#FF8FB1" to="#E4577E" size={s}>
      <circle cx="28" cy="28" r="11" />
      <circle cx="24" cy="25" r="1.4" fill="white" stroke="none" />
      <circle cx="32" cy="25" r="1.4" fill="white" stroke="none" />
      <path d="M23.5 31a5 4 0 0 0 9 0" />
    </Tile>
  ),
  account: (s) => (
    <Tile id="ic-account" from="#5B8DEF" to="#3358D4" size={s}>
      <rect x="17" y="16" width="22" height="24" rx="3.5" />
      <path d="M22 23h12M22 28h9" />
      <path d="M30 34l2.6 2.6 5-5.5" />
    </Tile>
  ),
  guarantee: (s) => (
    <Tile id="ic-guarantee" from="#A06BFF" to="#6D28D9" size={s}>
      <path d="M28 16l9 4v8c0 7-5 11-9 13-4-2-9-6-9-13v-8z" />
      <path d="M23.5 28l3.2 3.2 6-6.4" />
    </Tile>
  ),
  globe: (s) => (
    <Tile id="ic-globe" from="#3BC9DB" to="#1098AD" size={s}>
      <circle cx="28" cy="28" r="12" />
      <path d="M16 28h24" />
      <path d="M28 16c4 4.5 4 19.5 0 24M28 16c-4 4.5-4 19.5 0 24" />
    </Tile>
  ),
  leaf: (s) => (
    <Tile id="ic-leaf" from="#5BD98A" to="#0E9F58" size={s}>
      <path d="M20 36c-2-10 4-18 16-20 2 10-4 18-16 20z" />
      <path d="M22.5 33.5c4-6 8-9.5 12-11.5" />
    </Tile>
  ),
  percent: (s) => (
    <Tile id="ic-percent" from="#FFC75A" to="#F39200" size={s}>
      <line x1="22" y1="22" x2="34" y2="34" />
      <circle cx="23" cy="23" r="2.4" />
      <circle cx="33" cy="33" r="2.4" />
    </Tile>
  ),
};

export function ProductIcon({ name, size = 52 }: { name: ProductIconName; size?: number }) {
  return <>{ICONS[name](size)}</>;
}
