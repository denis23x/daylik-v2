'use client';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { useRetrosMessagesRealtime } from '@/hooks/useRetrosMessages';
import { PageParams } from '@/types/utils/pageParams.type';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RetrosMessagesAlert = () => {
  const t = useTranslations('components.dashboard.retros.messagesAlert');
  const params = useParams<PageParams>();
  const { event: message } = useRetrosMessagesRealtime(params.UUID);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (message) {
      setName(message.name || t('anonymous'));
      setDescription(message.description);

      // Show the alert
      setIsConfirmOpen(true);
    }
  }, [message, setName, setDescription, t]);

  return (
    <ConfirmDialog
      title={t('title')}
      description={`${name}: ${description}`}
      confirmShow={false}
      cancelText={t('confirm.close')}
      open={isConfirmOpen}
      onOpenChange={setIsConfirmOpen}
    />
  );
};

export default RetrosMessagesAlert;
