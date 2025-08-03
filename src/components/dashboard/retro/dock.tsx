'use client';

import { HomeIcon, NotebookPenIcon, QrCode } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Dock, DockIcon } from '@/components/magicui/dock';
import { Link } from '@/i18n/navigation';

const RetroDock = () => {
  const handleNotes = () => {
    alert('Notes');
  };

  const handleQrCode = () => {
    alert('QrCode');
  };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2">
      <Dock direction="middle" className="bg-background">
        <DockIcon>
          <Link href="/teams" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
            <HomeIcon />
          </Link>
        </DockIcon>
        <Separator orientation="vertical" className="h-full" />
        <DockIcon>
          <Button variant="ghost" size="icon" onClick={handleNotes}>
            <NotebookPenIcon />
          </Button>
        </DockIcon>
        <DockIcon>
          <Button variant="ghost" size="icon" onClick={handleQrCode}>
            <QrCode />
          </Button>
        </DockIcon>
      </Dock>
    </div>
  );
};

export default RetroDock;
