import { useLocale } from 'next-intl';
import { es, de, ru } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import { LOCALES } from '@/lib/constants';

const localeMap: Partial<Record<(typeof LOCALES)[number], Locale>> = {
  es,
  de,
  ru,
};

export function useDateFnsLocale(): Locale | undefined {
  const locale = useLocale();

  // Return current locale
  return localeMap[locale as (typeof LOCALES)[number]];
}
