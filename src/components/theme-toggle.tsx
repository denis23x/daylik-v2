'use client';

import { MoonIcon, Monitor, SunIcon, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const ThemeToggle = ({
  variant,
  className,
}: {
  variant: 'navbar' | 'sheet';
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isNavbar = variant === 'navbar';

  useEffect(() => {
    setMounted(true);
  }, []);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <SunIcon className="size-4" /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon className="size-4" /> },
    { value: 'system', label: 'System', icon: <Monitor className="size-4" /> },
  ];

  const handleSelect = (value: string) => {
    setTheme(value);

    // Close the popover
    setOpen(false);
  };

  return mounted ? (
    <Popover modal={true} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={isNavbar ? 'ghost' : 'outline'}
          size={isNavbar ? 'icon' : 'default'}
          aria-label="Change theme"
          className={className}
        >
          {theme === 'system' ? <Monitor /> : theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          {!isNavbar && <span className="first-letter:uppercase">{theme}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-auto min-w-0 p-1">
        <ul className="flex flex-col gap-1">
          {themeOptions.map((option) => (
            <li
              key={option.value}
              className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors"
              onClick={() => handleSelect(option.value)}
              aria-selected={theme === option.value}
              role="option"
            >
              <Check className={`size-4 ${theme === option.value ? 'visible' : 'invisible'}`} />
              <span className="first-letter:uppercase">{option.value}</span>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  ) : (
    <Skeleton className={`h-9 ${isNavbar ? 'w-9' : 'w-full'}`} />
  );
};

export default ThemeToggle;
