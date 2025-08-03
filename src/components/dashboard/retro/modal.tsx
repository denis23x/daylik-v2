'use client';

import { useRetroStore } from '@/store/useRetroStore';
import ResponsiveDialog from '@/components/responsive-dialog';
import RetroQrCode from './qr-code';
import RetroNotesEditor from './editor/editor';
import { useTranslations } from 'next-intl';

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
    />
  );
}
