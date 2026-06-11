'use client';
import React from 'react';

interface Product3DIconProps {
  icon: React.ReactNode;
}

export function Product3DIcon({ icon }: Product3DIconProps) {
  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-brand/10"
      aria-hidden="true"
    >
      <span className="text-brand">{icon}</span>
    </div>
  );
}
