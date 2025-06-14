'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

const ThemeToggle = ({
  text,
  variant,
  size,
}: {
  text?: boolean;
  variant: 'outline' | 'ghost';
  size: 'icon' | 'default';
}) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <Button
        variant={variant}
        size={size}
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
        {text && (resolvedTheme === 'dark' ? 'Light' : 'Dark')}
      </Button>
    )
  );
};

export default ThemeToggle;
