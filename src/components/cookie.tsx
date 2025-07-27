'use client';

import { CookieIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { getCookie, setCookie, deleteAllCookies } from '@/hooks/useCookie';
import { COOKIE_CONSENT } from '@/lib/constants';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Cookie() {
  const t = useTranslations('components.cookie');
  const name = useRef(COOKIE_CONSENT);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccept = () => {
    setIsOpen(false);
    setCookie(name.current, String(1));
  };

  const handleDecline = () => {
    setIsOpen(false);
    setCookie(name.current, String(0));

    // Clear all cookies
    deleteAllCookies();
  };

  useEffect(() => {
    const cookie = getCookie(name.current);

    if (!!Number(cookie)) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  return (
    isOpen && (
      <div className="fixed right-0 bottom-4 left-0 z-10 container mx-auto px-4">
        <Card className="bg-background/80 flex w-full flex-col gap-2 p-4 backdrop-blur-sm backdrop-filter">
          <CardHeader className="flex items-center gap-3 p-0">
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
            <h1 className="text-xl font-bold tracking-tight">{t('title')}</h1>
          </CardHeader>
          <CardContent className="flex flex-col items-end justify-between gap-4 p-0 md:flex-row md:items-center">
            <p className="text-muted-foreground text-left text-xs">
              {t('description.main')}{' '}
              <Link
                className="underline"
                href="/legal/cookie-policy"
                aria-label={t('links.cookiePolicy.ariaLabel')}
              >
                {t('links.cookiePolicy.text')}
              </Link>
              . {t('description.agreement')}{' '}
            </p>
            <div className="flex items-center gap-4 p-0">
              <Button onClick={handleDecline} variant="secondary">
                {t('buttons.decline')}
              </Button>
              <Button onClick={handleAccept}>{t('buttons.accept')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  );
}
