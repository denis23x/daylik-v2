'use client';

import { Check, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Skeleton } from './ui/skeleton';
import { useLocale, useTranslations } from 'next-intl';
import { LOCALES } from '@/lib/constants';
import { useParams, useSearchParams } from 'next/navigation';

const LanguageSwitcher = ({
  variant,
  className,
}: {
  variant: 'navbar' | 'sheet';
  className?: string;
}) => {
  const t = useTranslations('components.languageSwitcher');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useParams<{ UUID: string }>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();
  const isNavbar = variant === 'navbar';

  const handleChange = (locale: string) => {
    router.replace(
      {
        pathname,
        params,
        query: Object.fromEntries(searchParams.entries()),
      },
      {
        locale,
      }
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={isNavbar ? 'ghost' : 'outline'}
          size={isNavbar ? 'icon' : 'default'}
          aria-label={t('ariaLabel')}
          className={className}
        >
          <Languages />
          {!isNavbar && locale.toUpperCase()}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-auto min-w-0 p-1">
        <ul className="flex flex-col gap-1">
          {LOCALES.map((l) => (
            <li
              key={l}
              className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors"
              onClick={() => handleChange(l)}
              aria-selected={locale === l}
              role="option"
            >
              <Check className={`size-4 ${locale === l ? 'visible' : 'invisible'}`} />
              <span className="uppercase">{l}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  ) : (
    <Skeleton className={`h-9 ${isNavbar ? 'w-9' : 'w-full'}`} />
  );
};

export default LanguageSwitcher;
