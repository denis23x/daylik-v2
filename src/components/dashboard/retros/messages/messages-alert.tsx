'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { useRetrosMessagesRealtime } from '@/hooks/useRetrosMessages';
import { PageParams } from '@/types/utils/pageParams.type';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RetrosMessagesAlert = () => {
  const params = useParams<PageParams>();
  const { event: message } = useRetrosMessagesRealtime(params.UUID);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setIsConfirmOpen(true);
    }
  }, [message]);

  // TODO: test
  // useEffect(() => {
  //   let confirmTimeout: NodeJS.Timeout | null = null;

  //   if (params?.UUID) {
  //     confirmTimeout = setTimeout(() => {
  //       setIsConfirmOpen(true);
  //     }, 2000);
  //   }

  //   return () => {
  //     if (confirmTimeout) clearTimeout(confirmTimeout);
  //   };
  //   // Only run when params.UUID changes
  // }, [params?.UUID]);

  return (
    <ConfirmDialog
      title="New message"
      description="You have a new message from your team. Would you like to read it?"
      open={isConfirmOpen}
      onOpenChange={setIsConfirmOpen}
      onConfirmAction={() => {}}
    />
  );
};

export default RetrosMessagesAlert;
