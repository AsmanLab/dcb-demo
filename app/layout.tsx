import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ChatWidget } from "@/components/ChatWidget";

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
  description: "ОАО «Дос-Кредобанк» — надёжный банк Кыргызстана. Кредиты, депозиты, карты, переводы. Лицензия НБ КР №037.",
  openGraph: {
    title: "Дос-Кредобанк — Цифровой банк 24/7",
    description: "Надёжный банк Кыргызстана. Кредиты от 18%, депозиты до 14%, карты Visa и Elcard.",
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
      </head>
      <body className="min-h-screen">
        <Providers>
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
