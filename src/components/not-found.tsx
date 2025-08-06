'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Construction } from 'lucide-react';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const t = useTranslations('components.notFound');

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 p-4 text-center">
      <Construction />
      <span className="text-2xl font-bold sm:text-3xl md:text-4xl">{t('title')}</span>
      <p className="text-base md:text-lg">{t('description')}</p>
      <div className="flex gap-2">
        <Link className={cn(buttonVariants({ variant: 'secondary' }))} href="/">
          {t('homeButton')}
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
