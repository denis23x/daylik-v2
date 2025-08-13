'use client';

import { AtSign, HomeIcon, NotebookPenIcon, QrCode } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Dock } from '@/components/magicui/dock';
import { Link } from '@/i18n/navigation';
import { useRetroStore } from '@/store/useRetroStore';
import ThemeToggle from '@/components/theme-toggle';
import LanguageSwitcher from '@/components/language-switcher';
import { useRetrosMessagesRealtime } from '@/hooks/useRetrosMessages';
import type { PageParams } from '@/types/utils/pageParams.type';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';

const RetrosDock = () => {
  const { openModal } = useRetroStore();
  const params = useParams<PageParams>();
  const { event: message } = useRetrosMessagesRealtime(params.UUID);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // TODO: Fix this
  // useEffect(() => {
  //   let qrTimeout: NodeJS.Timeout | null = null;
  //   let confirmTimeout: NodeJS.Timeout | null = null;

  //   if (params?.UUID) {
  //     qrTimeout = setTimeout(() => {
  //       handleQrCode();
  //       confirmTimeout = setTimeout(() => {
  //         setIsConfirmOpen(true);
  //       }, 2000);
  //     }, 1000);
  //   }

  //   return () => {
  //     if (qrTimeout) clearTimeout(qrTimeout);
  //     if (confirmTimeout) clearTimeout(confirmTimeout);
  //   };
  //   // Only run when params.UUID changes
  // }, [params?.UUID]);

  useEffect(() => {
    if (message) {
      setIsConfirmOpen(true);
    }
  }, [message]);

  const handleNotes = () => {
    openModal('notes');
  };

  const handleMessages = () => {
    openModal('messages');
  };

  const handleQrCode = () => {
    openModal('qr');
  };

  return (
    <div>
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2">
        <Dock direction="middle" className="bg-background shadow-lg">
          <Link href="/teams" className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}>
            <HomeIcon />
          </Link>
          <Separator orientation="vertical" className="h-full" />
          <Button variant="ghost" size="icon" onClick={handleNotes}>
            <NotebookPenIcon />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleMessages}>
            <AtSign />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleQrCode}>
            <QrCode />
          </Button>
          <Separator orientation="vertical" className="h-full" />
          <ThemeToggle variant="navbar" />
          <LanguageSwitcher variant="navbar" />
        </Dock>
      </div>
      <ConfirmDialog
        title="New message"
        description="You have a new message from your team. Would you like to read it?"
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirmAction={() => {}}
      />
    </div>
  );
};

export default RetrosDock;
