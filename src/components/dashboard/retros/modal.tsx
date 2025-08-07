'use client';

import { useRetroStore } from '@/store/useRetroStore';
import ResponsiveDialog from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Mobile optimization
const RetrosQrCode = dynamic(() => import('./qr-code'));
const RetrosNotesEditor = dynamic(() => import('./editor/editor'));

export default function RetrosModal() {
  const { isOpen, closeModal, mode } = useRetroStore();
  const t = useTranslations('components.dashboard.retros.modal');

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !open && closeModal()}
      title={t(`${mode}.title`)}
      description={t(`${mode}.description`)}
      content={mode === 'qr' ? <RetrosQrCode /> : <RetrosNotesEditor />}
      trigger={undefined}
      left={undefined}
      right={undefined}
      showClose={false}
      maxWidth={mode === 'qr' ? 'sm:max-w-sm' : 'sm:max-w-xl'}
    />
  );
}
