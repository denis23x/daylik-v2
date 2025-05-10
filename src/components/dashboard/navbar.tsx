'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '../logo';
import ThemeToggle from '../theme-toggle';
import Link from 'next/link';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { useEffect, useState } from 'react';

const NavigationSheet = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close sheet when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    }

    router.push('/');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Access your resources and settings from this sidebar menu.
          </SheetDescription>
        </SheetHeader>
        <NavigationMenu>
          <NavigationMenuList className="grid gap-6 space-x-0 p-4 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/teams">Teams</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/teammates">Teammates</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/profile">Profile</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const DashboardNavbar = () => {
  return (
    <nav className="border-accent bg-background/80 fixed top-0 left-0 z-50 h-16 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/teams" className="hidden sm:inline-flex">
            <Button variant="outline">Teams</Button>
          </Link>
          <Link href="/teammates" className="hidden sm:inline-flex">
            <Button variant="outline">Teammates</Button>
          </Link>
          <NavigationSheet />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
