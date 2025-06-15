'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '../logo';
import ThemeToggle from '../theme-toggle';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CalendarSearch, Grid2x2, Menu, Settings, UsersRound } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter, usePathname } from 'next/navigation';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import { NavigationMenu } from '@radix-ui/react-navigation-menu';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ConfirmDialog } from '../confirm-dialog';
import { useSignOut } from '@/hooks/useAuth';
import NavbarCalendar from './navbar-calendar';

const NavigationSheet = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { mutateAsync: signOut } = useSignOut();

  // Close sheet when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await signOut();

      // Redirect to home page
      router.push('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
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
        <ConfirmDialog
          title="Are you absolutely sure?"
          description="You’ll need to sign in again to access your account."
          open={isAlertOpen}
          onOpenChange={setIsAlertOpen}
          onConfirmAction={handleLogout}
        />
        <NavigationMenu>
          <NavigationMenuList className="grid gap-4 space-x-0 p-4 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="flex items-center gap-2" href="/teams">
                  <Grid2x2 size={16} />
                  Teams
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Separator />
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="flex items-center gap-2" href="/teammates">
                  <UsersRound size={16} />
                  Teammates
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Separator />
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="flex items-center gap-2" href="/settings">
                  <Settings size={16} />
                  Settings
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <SheetFooter>
          <ThemeToggle text variant="outline" size="default" />
          <Button onClick={() => setIsAlertOpen(true)}>Logout</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const DashboardNavbar = () => {
  return (
    <nav className="border-accent bg-background/80 sticky top-0 left-0 z-50 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Button className="inline-flex" variant="outline" size="icon" asChild>
            <Link href="/teams">
              <Grid2x2 />
            </Link>
          </Button>
          <Button className="inline-flex" variant="outline" size="icon" asChild>
            <Link href="/teammates">
              <UsersRound />
            </Link>
          </Button>
          <NavbarCalendar>
            <Button variant="outline" size="icon" type="button">
              <CalendarSearch className="h-5 w-5" />
            </Button>
          </NavbarCalendar>
          <NavigationSheet />
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
