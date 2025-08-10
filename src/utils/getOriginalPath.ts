import { routing } from '../i18n/routing';

export function getOriginalPath(localizedPathname: string, locale: string): string | null {
  const decodedPath = decodeURIComponent(localizedPathname);

  for (const path in routing.pathnames) {
    const translations = routing.pathnames[path as keyof typeof routing.pathnames];
    if (!translations) continue;

    const localizedRoute = translations[locale as keyof typeof translations];
    if (!localizedRoute) continue;

    const pattern = localizedRoute.replace(/\[.*?\]/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);

    if (regex.test(decodedPath)) {
      return path;
    }
  }

  return null;
}
