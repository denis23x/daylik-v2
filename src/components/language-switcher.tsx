'use client';

import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { routing } from '@/i18n/routing';
import { Skeleton } from './ui/skeleton';
import { useLocale } from 'next-intl';

const LanguageSwitcher = ({
  variant,
  className,
}: {
  variant: 'navbar' | 'sheet';
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isNavbar = variant === 'navbar';

  const handleChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isNavbar ? 'ghost' : 'outline'}
          size={isNavbar ? 'icon' : 'default'}
          aria-label="Change language"
          className={className}
        >
          <Languages />
          {!isNavbar && locale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0">
        <DropdownMenuRadioGroup value={locale} onValueChange={(locale) => handleChange(locale)}>
          {routing.locales.map((locale) => (
            <DropdownMenuRadioItem key={locale} value={locale}>
              {locale.toUpperCase()}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Skeleton className={`h-9 ${isNavbar ? 'w-9' : 'w-full'}`} />
  );
};

export default LanguageSwitcher;
