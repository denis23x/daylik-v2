'use client';

import QRCode from 'react-qr-code';

const RetrosQrCode = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const fgColor = rootStyles.getPropertyValue('--foreground');
  const bgColor = rootStyles.getPropertyValue('--background');

  return (
    <div className="mb-4 flex h-auto w-full items-center justify-center rounded-xl border p-4 sm:mb-0">
      <QRCode
        className="h-auto w-full max-w-full rounded-md"
        size={256}
        value={'https://www.daylik.io'}
        viewBox={`0 0 256 256`}
        bgColor={bgColor}
        fgColor={fgColor}
      />
    </div>
  );
};

export default RetrosQrCode;
