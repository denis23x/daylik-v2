import { MetadataRoute } from 'next';
import { LOCALES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.daylik.io';
  const locales = LOCALES;
  const defaultLocale = 'en';

  const pages = [''];
  const lastModified = new Date();
  const sitemap: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const path = page ? `/${page}` : '';

    for (const locale of locales) {
      const localizedUrl = `${baseUrl}/${locale}${path}`;

      sitemap.push({
        url: localizedUrl,
        lastModified,
        changeFrequency: 'weekly',
        priority: locale === defaultLocale ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries([
            ...locales.map((altLocale) => [altLocale, `${baseUrl}/${altLocale}${path}`]),
            ['x-default', `${baseUrl}/${defaultLocale}${path}`],
          ]),
        },
      });
    }
  }

  return sitemap;
}
