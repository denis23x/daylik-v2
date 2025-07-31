import { Flame } from 'lucide-react';
import { RainbowButton } from '../magicui/rainbow-button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const HomeStats = () => {
  const t = useTranslations('components.home.stats');

  return (
    <div
      id="why"
      className="min-h-screen-home relative container mx-auto flex flex-col items-center justify-center gap-2 px-4 py-14"
    >
      <span className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {t('title')}
      </span>
      <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
      <ul className="my-12 grid justify-center gap-x-12 gap-y-16 sm:my-14 sm:grid-cols-4 lg:grid-cols-6">
        {/* Communication */}
        <li className="flex justify-center sm:col-span-2 lg:col-span-2">
          <div className="max-w-[20ch] text-center">
            <span className="text-5xl font-semibold">{t('items.communication.percentage')}</span>
            <p className="text-muted-foreground mt-4 text-lg">
              {t('items.communication.description')}
            </p>
          </div>
        </li>

        {/* Accountability */}
        <li className="flex justify-center sm:col-span-2 lg:col-span-2">
          <div className="max-w-[20ch] text-center">
            <span className="text-5xl font-semibold">{t('items.accountability.percentage')}</span>
            <p className="text-muted-foreground mt-4 text-lg">
              {t('items.accountability.description')}
            </p>
          </div>
        </li>

        {/* Efficiency */}
        <li className="flex justify-center sm:col-span-4 lg:col-span-2">
          <div className="max-w-[20ch] text-center">
            <span className="text-5xl font-semibold">{t('items.efficiency.percentage')}</span>
            <p className="text-muted-foreground mt-4 text-lg">
              {t('items.efficiency.description')}
            </p>
          </div>
        </li>
      </ul>
      <RainbowButton className="rounded-full p-0" as="span">
        <Link
          href="/signup"
          aria-label={t('buttonAriaLabel')}
          className="flex size-full items-center justify-center gap-1.5 px-3 py-2"
        >
          {t('buttonText')}
          <Flame className="fill-destructive dark:fill-transparent" />
        </Link>
      </RainbowButton>
    </div>
  );
};

export default HomeStats;
