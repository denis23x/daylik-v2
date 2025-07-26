'use client';

import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import { useAutoScroll } from '@/hooks/ui/useAutoScroll';
import LanguageSwitcher from './language-switcher';

const Navbar = () => {
  const { scrollTo } = useAutoScroll();

  const handleClick = (id: string) => {
    scrollTo(id);
  };

  return (
    <nav className="bg-background/80 sticky top-0 left-0 z-50 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Logo />
        </Link>
        <ul className="hidden items-center gap-6 xl:flex">
          <li className="flex">
            <span
              className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
              onClick={() => handleClick('testimonials')}
            >
              Testimonials
            </span>
          </li>
          <li className="flex">
            <span
              className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
              onClick={() => handleClick('why')}
            >
              Why Daylik?
            </span>
          </li>
          <li className="flex">
            <span
              className="text-muted-foreground hover:text-foreground cursor-pointer text-sm"
              onClick={() => handleClick('pricing')}
            >
              Pricing
            </span>
          </li>
        </ul>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="navbar" />
          <LanguageSwitcher variant="navbar" />
          <Button className="inline-flex" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
