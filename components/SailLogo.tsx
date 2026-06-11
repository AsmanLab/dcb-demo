import React from 'react';

interface SailLogoProps {
  size?: number;
  className?: string;
}

export function SailLogo({ size = 36, className = '' }: SailLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Дос-Кредобанк логотип"
    >
      {/* Sail shape — geometric / stylized */}
      <path
        d="M18 4 L30 28 L18 24 L6 28 Z"
        fill="url(#sail-grad)"
        opacity="0.95"
      />
      <path
        d="M18 4 L18 24"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Water line */}
      <path
        d="M4 30 Q10 28 18 30 Q26 32 32 30"
        stroke="#E4002B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="sail-grad" x1="6" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF3355" />
          <stop offset="50%" stopColor="#E4002B" />
          <stop offset="100%" stopColor="#B3001B" />
        </linearGradient>
      </defs>
    </svg>
  );
}
