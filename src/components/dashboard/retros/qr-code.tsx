'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { routing } from '@/i18n/routing';
import { Siren, Clipboard, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { useCopyToClipboard } from 'usehooks-ts';

const RetrosQrCode = () => {
  const t = useTranslations('components.dashboard.retros.qrCode');
  const rootStyles = getComputedStyle(document.documentElement);
  const fgColor = rootStyles.getPropertyValue('--foreground');
  const bgColor = rootStyles.getPropertyValue('--background');
  const pathnames = routing.pathnames;
  const [value, setValue] = useState('');
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const [locale, ...urlSegments] = window.location.pathname.split('/').filter(Boolean);
    const UUID = urlSegments.pop();
    const anonymous = pathnames['/anonymous'];
    const pathname = anonymous[locale as keyof typeof anonymous].slice(1);
    const url = new URL(window.location.origin);

    url.pathname = [locale, pathname].join('/');
    url.searchParams.append('retroUUID', UUID as string);

    setValue(decodeURIComponent(url.toString()));
  }, [pathnames]);

  const handleClickCopy = () => {
    toast.promise(copy?.(value), {
      success: t('messages.success'),
      error: (e: unknown) => (e instanceof Error ? e.message : t('messages.error')),
    });

    setIsCopied(true);

    // Reset copied state after 3 seconds
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="mb-4 flex flex-col gap-4 sm:mb-0">
      <div className="rounded-xl border p-4">
        <QRCode
          className="h-auto w-full rounded-md"
          size={256}
          value={value}
          viewBox={`0 0 256 256`}
          bgColor={bgColor}
          fgColor={fgColor}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Input type="text" className="w-full" value={value} readOnly />
        <Button variant="outline" size="icon" onClick={handleClickCopy}>
          {isCopied ? <Check /> : <Clipboard />}
        </Button>
      </div>
      <Alert variant="destructive">
        <Siren />
        <AlertTitle>{t('alert.title')}</AlertTitle>
        <AlertDescription>{t('alert.description')}</AlertDescription>
      </Alert>
    </div>
  );
};

export default RetrosQrCode;
