'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '../logo';
import ThemeToggle from '../theme-toggle';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { createClient } from '@/utils/supabase/client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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

const DashboardNavbar = () => {
  const supabase = createClient();

  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
    }

    router.push('/');
  };

  return (
    <nav className="border-accent bg-background/80 fixed top-0 left-0 z-50 h-16 w-full border-b backdrop-blur-sm backdrop-filter">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/teams">
            <Button variant="outline" className="hidden sm:inline-flex">
              Teams
            </Button>
          </Link>
          <Link href="/teammates">
            <Button variant="outline" className="hidden sm:inline-flex">
              Teammates
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="outline" className="hidden sm:inline-flex">
              Profile
            </Button>
          </Link>
          <Button variant="outline" className="hidden sm:inline-flex" onClick={handleLogout}>
            Logout
          </Button>
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
