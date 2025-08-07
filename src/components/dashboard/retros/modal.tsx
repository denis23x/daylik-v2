'use client';

import { useRetroStore } from '@/store/useRetroStore';
import ResponsiveDialog from '@/components/responsive-dialog';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

// Mobile optimization
const RetroQrCode = dynamic(() => import('./qr-code'));
const RetroNotesEditor = dynamic(() => import('./editor/editor'));

export default function RetroModal() {
  const { isOpen, closeModal, mode } = useRetroStore();
  const t = useTranslations('components.dashboard.retro.modal');

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !open && closeModal()}
      title={t(`${mode}.title`)}
      description={t(`${mode}.description`)}
      content={mode === 'qr' ? <RetroQrCode /> : <RetroNotesEditor />}
      trigger={undefined}
      left={undefined}
      right={undefined}
      showClose={false}
      maxWidth={mode === 'qr' ? 'sm:max-w-sm' : 'sm:max-w-xl'}
    />
  );
}
