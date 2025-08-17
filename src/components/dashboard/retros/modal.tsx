'use client';

import { useRetroStore } from '@/store/useRetroStore';
import ResponsiveDialog from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Mobile optimization
const RetrosQrCode = dynamic(() => import('./qr-code'));
const RetrosNotesEditor = dynamic(() => import('./editor/editor'));
const RetrosMessages = dynamic(() => import('./messages/messages'));

export default function RetrosModal() {
  const { isOpen, closeModal, mode } = useRetroStore();
  const t = useTranslations('components.dashboard.retros.modal');
  const modalMap = {
    qr: {
      component: <RetrosQrCode />,
      maxWidth: 'sm:max-w-md',
    },
    messages: {
      component: <RetrosMessages />,
      maxWidth: 'sm:max-w-lg',
    },
    notes: {
      component: <RetrosNotesEditor />,
      maxWidth: 'sm:max-w-2xl',
    },
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !open && closeModal()}
      title={t(`${mode}.title`)}
      description={t(`${mode}.description`)}
      content={<div className="mb-4 sm:mb-0">{modalMap[mode].component}</div>}
      trigger={undefined}
      left={undefined}
      right={undefined}
      showClose={false}
      maxWidth={modalMap[mode].maxWidth}
    />
  );
}
