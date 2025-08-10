'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Siren } from 'lucide-react';
import { useTranslations } from 'next-intl';
import QRCode from 'react-qr-code';

const RetrosQrCode = () => {
  const t = useTranslations('components.dashboard.retros.qrCode');
  const rootStyles = getComputedStyle(document.documentElement);
  const fgColor = rootStyles.getPropertyValue('--foreground');
  const bgColor = rootStyles.getPropertyValue('--background');

  return (
    <div className="mb-4 flex flex-col gap-4 sm:mb-0">
      <div className="h-auto w-full rounded-xl border p-4">
        <QRCode
          className="h-auto w-full max-w-full rounded-md"
          size={256}
          value={'https://www.daylik.io'}
          viewBox={`0 0 256 256`}
          bgColor={bgColor}
          fgColor={fgColor}
        />
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
