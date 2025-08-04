import { useLocale } from 'next-intl';
import { es, de, ru } from 'react-day-picker/locale';
import type { Locale } from 'react-day-picker';
import { LOCALES } from '@/lib/constants';

const localeMap: Partial<Record<(typeof LOCALES)[number], Locale>> = {
  es,
  de,
  ru,
};

export function useDayPickerLocale(): Locale | undefined {
  const locale = useLocale();

  // Return current locale
  return localeMap[locale as (typeof LOCALES)[number]];
}
