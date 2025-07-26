import { defineRouting } from 'next-intl/routing';
import { LOCALES } from '@/lib/constants';

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: 'en',
});
