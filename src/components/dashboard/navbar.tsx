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
import {
  CalendarSearch,
  Grid2x2,
  Menu,
  MessageCircleMore,
  Settings,
  UsersRound,
} from 'lucide-react';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
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
import { useFeedbackStore } from '@/store/useFeedbackStore';

const NavigationSheet = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutateAsync: signOut } = useSignOut();
  const { openModal: openFeedbackModal } = useFeedbackStore();

  // Close sheet when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    const p = async (): Promise<void> => {
      await signOut();

      // Redirect to home page with reload
      window.location.href = '/';
    };

    toast.promise(p(), {
      // loading: 'Ending session..',
      error: (e: unknown) => (e instanceof Error ? e.message : 'An error occurred'),
    });
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
            <Separator />
            <NavigationMenuItem>
              <div className="flex cursor-pointer items-center gap-2" onClick={openFeedbackModal}>
                <MessageCircleMore size={16} />
                Feedback
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <SheetFooter className="gap-3">
          <ThemeToggle text variant="outline" size="default" />
          <Button onClick={() => setIsConfirmOpen(true)}>Logout</Button>
        </SheetFooter>
        <ConfirmDialog
          title="Are you absolutely sure?"
          description="You’ll need to sign in again to access your account."
          open={isConfirmOpen}
          onOpenChange={setIsConfirmOpen}
          onConfirmAction={handleLogout}
        />
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
