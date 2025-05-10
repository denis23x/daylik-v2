'use client';

import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import ThemeToggle from './theme-toggle';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="border-accent bg-background/80 fixed top-0 left-0 z-50 h-16 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button className="inline-flex">Sign In</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
