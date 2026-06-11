'use client';
import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CurrencyTicker } from '@/components/CurrencyTicker';
import { TrustBar } from '@/components/TrustBar';
import { Products } from '@/components/Products';
import { CreditCalculator } from '@/components/CreditCalculator';
import { Deposits } from '@/components/Deposits';
import { AISection } from '@/components/AISection';
import { GreenBanking } from '@/components/GreenBanking';
import { AppShowcase } from '@/components/AppShowcase';
import { BranchMap } from '@/components/BranchMap';
import { CTABand } from '@/components/CTABand';
import { Footer } from '@/components/Footer';

function openChat() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('dcb:open-chat'));
  }
}

export default function Home() {
  return (
    <main>
      <Header />
      <Hero onOpenChat={openChat} />
      <CurrencyTicker />
      <TrustBar />
      <Products />
      <CreditCalculator />
      <Deposits />
      <AISection onOpenChat={openChat} />
      <GreenBanking />
      <AppShowcase />
      <BranchMap />
      <CTABand />
      <Footer />
    </main>
  );
}
