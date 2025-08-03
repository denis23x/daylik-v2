'use client';

import { HomeIcon, NotebookPenIcon, QrCode } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Dock } from '@/components/magicui/dock';
import { Link } from '@/i18n/navigation';
import { useRetroStore } from '@/store/useRetroStore';
import ThemeToggle from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/language-switcher';

const RetroDock = () => {
  const { openModal } = useRetroStore();

  const handleNotes = () => {
    openModal('notes');
  };

  const handleQrCode = () => {
    openModal('qr');
  };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2">
      <Dock direction="middle" className="bg-background shadow-lg">
        <Link href="/teams" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
          <HomeIcon />
        </Link>
        <Separator orientation="vertical" className="h-full" />
        <Button variant="ghost" size="icon" onClick={handleNotes}>
          <NotebookPenIcon />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleQrCode}>
          <QrCode />
        </Button>
        <Separator orientation="vertical" className="h-full" />
        <ThemeToggle variant="navbar" />
        <LanguageSwitcher variant="navbar" />
      </Dock>
    </div>
  );
};

export default RetroDock;
