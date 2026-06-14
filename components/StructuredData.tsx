import React from 'react';
import { DEPARTMENTS } from '@/lib/branches';

// schema.org BankOrganization + branch network for SEO / rich results.
export function StructuredData() {
  const branches = DEPARTMENTS.filter(d => d.lat !== null && d.lng !== null).map(d => ({
    '@type': 'BankOrAtm' as const,
    name: d.name,
    address: { '@type': 'PostalAddress', addressCountry: 'KG', addressRegion: d.region, streetAddress: d.address },
    geo: { '@type': 'GeoCoordinates', latitude: d.lat, longitude: d.lng },
    telephone: d.phone || undefined,
    openingHours: d.is247 ? 'Mo-Su 00:00-24:00' : undefined,
  }));

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BankOrCreditUnion',
    name: 'ОАО «Дос-Кредобанк»',
    legalName: 'ОАО «Дос-Кредобанк»',
    foundingDate: '1997',
    url: 'https://www.dcb.kg/',
    email: 'office@doscredobank.kg',
    telephone: '8686',
    description: 'Надёжный банк Кыргызстана. Кредиты, депозиты, карты, переводы. Лицензия НБ КР №037.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KG',
      addressLocality: 'Бишкек',
      postalCode: '720000',
      streetAddress: 'пр. Чуй, 92, 6 этаж',
    },
    sameAs: [
      'https://www.facebook.com/doscredobank.kg',
      'https://www.instagram.com/doscredobank_kg',
      'https://twitter.com/doscredobank_kg',
    ],
    subOrganization: branches,
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted content — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
