'use client';

import { MoonIcon, Monitor, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const ThemeToggle = ({
  variant,
  className,
}: {
  variant: 'navbar' | 'sheet';
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isNavbar = variant === 'navbar';

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isNavbar ? 'ghost' : 'outline'}
          size={isNavbar ? 'icon' : 'default'}
          aria-label="Change theme"
          className={className}
        >
          {theme === 'system' ? <Monitor /> : theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          {!isNavbar && <span className="first-letter:uppercase">{theme}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-0">
        <DropdownMenuRadioGroup value={theme} onValueChange={(theme) => setTheme(theme)}>
          {['light', 'dark', 'system'].map((theme) => (
            <DropdownMenuRadioItem key={theme} value={theme}>
              <span className="first-letter:uppercase">{theme}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Skeleton className={`h-9 ${isNavbar ? 'w-9' : 'w-full'}`} />
  );
};

export default ThemeToggle;
