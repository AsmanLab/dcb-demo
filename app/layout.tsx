import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ChatWidget } from "@/components/ChatWidget";
import { BottomNav } from "@/components/BottomNav";
import { StructuredData } from "@/components/StructuredData";
import { ApplicationModal } from "@/components/ApplicationModal";
import { ServiceWorker } from "@/components/ServiceWorker";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Дос-Кредобанк — Цифровой банк 24/7",
  description: "ОАО «Дос-Кредобанк» — надёжный банк Кыргызстана с 1997 года. Кредиты от 20%, депозиты до 14%, карты Элкарт, переводы по 170+ странам. Лицензия НБ КР №037.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "DCB",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Дос-Кредобанк — Цифровой банк 24/7",
    description: "Надёжный банк Кыргызстана. Кредиты от 20%, депозит «Бай Бол» до 14%, карты Элкарт, переводы по 170+ странам.",
    locale: "ru_KG",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#E4002B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('dcb-theme');
                if (t === 'dark') { document.documentElement.classList.add('dark'); }
                else { document.documentElement.classList.remove('dark'); }
              } catch(e) { document.documentElement.classList.remove('dark'); }
            `,
          }}
        />
        <StructuredData />
      </head>
      <body className="min-h-screen pb-[68px] lg:pb-0">
        <Providers>
          {children}
          <BottomNav />
          <ChatWidget />
          <ApplicationModal />
          <ServiceWorker />
        </Providers>
      </body>
    </html>
  );
}
