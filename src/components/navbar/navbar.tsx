import { Button } from '@/components/ui/button';
import { Logo } from '../logo';
import { NavMenu } from './nav-menu';
import { NavigationSheet } from './navigation-sheet';
import ThemeToggle from '../theme-toggle';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="border-accent bg-background/80 fixed top-0 left-0 z-50 h-16 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/signup">
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
          </Link>
          <Button className="xs:inline-flex hidden">Get Started</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
