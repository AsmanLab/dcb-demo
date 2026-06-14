'use client';
import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { MobileQuickGrid } from '@/components/MobileQuickGrid';
import { CurrencyTicker } from '@/components/CurrencyTicker';
import { TrustBar } from '@/components/TrustBar';
import { Products } from '@/components/Products';
import { Promos } from '@/components/Promos';
import { CreditCalculator } from '@/components/CreditCalculator';
import { Deposits } from '@/components/Deposits';
import { News } from '@/components/News';
import { FAQ } from '@/components/FAQ';
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
      <MobileQuickGrid />
      <CurrencyTicker />
      <TrustBar />
      <Promos />
      <Products />
      <CreditCalculator />
      <Deposits />
      <FAQ />
      <AISection onOpenChat={openChat} />
      <GreenBanking />
      <AppShowcase />
      <BranchMap />
      <News />
      <CTABand />
      <Footer />
    </main>
  );
}
