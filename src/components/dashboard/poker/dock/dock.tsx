'use client';

import { HomeIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Dock } from '@/components/magicui/dock';
import { Link } from '@/i18n/navigation';
import ThemeToggle from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/language-switcher';

const PokerDock = () => {
  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2">
      <Dock direction="middle" className="bg-background shadow-lg">
        <Link href="/teams" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
          <HomeIcon />
        </Link>
        {/* <Separator orientation="vertical" className="h-full" />
        <Button variant="ghost" size="icon" onClick={handleNotes}>
          <NotebookPenIcon />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleMessages}>
          <AtSign />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleQrCode}>
          <QrCode />
        </Button> */}
        <Separator orientation="vertical" className="h-full" />
        <ThemeToggle variant="navbar" />
        <LanguageSwitcher variant="navbar" />
      </Dock>
    </div>
  );
};

export default PokerDock;
