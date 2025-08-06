'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Logo } from '../logo';
import ThemeToggle from '../theme-toggle';
import { Link } from '@/i18n/navigation';
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
  Armchair,
} from 'lucide-react';
import { toast } from 'sonner';
import { usePathname } from '@/i18n/navigation';
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
import LanguageSwitcher from '../language-switcher';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import RetroModal from '../dx/retro/modal';

const NavigationSheet = () => {
  const t = useTranslations('components.dashboard.navbar.sheet');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutateAsync: signOut } = useSignOut();
  const { openModal } = useFeedbackStore();

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
      error: (e: unknown) => (e instanceof Error ? e.message : t('messages.error')),
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
          <SheetTitle>{t('title')}</SheetTitle>
          <SheetDescription>{t('description')}</SheetDescription>
        </SheetHeader>
        <NavigationMenu>
          <NavigationMenuList className="grid gap-4 space-x-0 p-4 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="flex items-center gap-2" href="/teams">
                  <Grid2x2 size={16} />
                  {t('links.teams')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Separator />
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="flex items-center gap-2" href="/teammates">
                  <UsersRound size={16} />
                  {t('links.teammates')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Separator />
            <NavigationMenuItem>
              <RetroModal>
                <div className="flex cursor-pointer items-center gap-2">
                  <Armchair size={16} />
                  {t('links.retro')}
                </div>
              </RetroModal>
            </NavigationMenuItem>
            <Separator />
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link className="flex items-center gap-2" href="/settings">
                  <Settings size={16} />
                  {t('links.settings')}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Separator />
            <NavigationMenuItem>
              <div className="flex cursor-pointer items-center gap-2" onClick={openModal}>
                <MessageCircleMore size={16} />
                {t('links.feedback')}
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <SheetFooter className="gap-3">
          <Button
            className="standalone:flex hidden"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            {t('buttons.update')}
          </Button>
          <div className="flex items-center gap-3">
            <ThemeToggle className="flex-1" variant="sheet" />
            <LanguageSwitcher className="flex-1" variant="sheet" />
          </div>
          <Button onClick={() => setIsConfirmOpen(true)}>{t('buttons.logout')}</Button>
        </SheetFooter>
        <ConfirmDialog
          title={t('confirm.title')}
          description={t('confirm.description')}
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
    <nav className="bg-background/80 sticky top-0 left-0 z-50 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))} href="/teams">
            <Grid2x2 />
          </Link>
          <Link
            className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
            href="/teammates"
          >
            <UsersRound />
          </Link>
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
