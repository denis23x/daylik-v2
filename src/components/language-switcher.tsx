'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const handleLocaleChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className="flex items-center gap-2">
      {routing.locales.map((locale) => (
        <Button
          key={locale}
          variant={currentLocale === locale ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleLocaleChange(locale)}
          className="uppercase"
        >
          {locale}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
