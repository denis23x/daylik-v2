import { useTranslations } from 'next-intl';
import Image from 'next/image';

export const Logo = () => {
  const t = useTranslations('components.logo');

  return (
    <div className="flex items-center gap-2">
      <Image src="/logo.svg" alt={t('logoAlt')} width={36} height={36} />
      <p className="text-xl font-bold">{t('logoText')}</p>
    </div>
  );
};
