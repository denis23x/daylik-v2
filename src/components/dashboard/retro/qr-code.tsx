'use client';

import QRCode from 'react-qr-code';

const RetroQrCode = () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const fgColor = rootStyles.getPropertyValue('--foreground');
  const bgColor = rootStyles.getPropertyValue('--background');

  return (
    <div className="flex h-auto w-full items-center justify-center rounded-xl border p-6">
      <QRCode
        size={256}
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        value={''}
        viewBox={`0 0 256 256`}
        bgColor={bgColor}
        fgColor={fgColor}
      />
    </div>
  );
};

export default RetroQrCode;
