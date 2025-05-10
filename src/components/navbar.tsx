'use client';

import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuProps,
} from '@radix-ui/react-navigation-menu';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';

const NavMenu = (props: NavigationMenuProps) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="flex gap-6 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#features">Features</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#faq">FAQ</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#testimonials">Testimonials</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="#pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />
        <div className="mt-8 space-y-4">
          <Button variant="outline" className="w-full sm:hidden">
            Sign In
          </Button>
          <Button className="xs:hidden w-full">Get Started</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Navbar = () => {
  return (
    <nav className="border-accent bg-background/80 fixed top-0 left-0 z-50 h-16 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu orientation="horizontal" className="hidden md:block" />

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
