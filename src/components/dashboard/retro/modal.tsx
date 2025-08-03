'use client';

import { useRetroStore } from '@/store/useRetroStore';
import ResponsiveDialog from '@/components/responsive-dialog';
import RetroQrCode from './qr-code';
import RetroNotesEditor from './editor';

export default function RetroModal() {
  const { isOpen, closeModal, mode } = useRetroStore();

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !open && closeModal()}
      title={'title'}
      description={'description'}
      content={mode === 'qr' ? <RetroQrCode /> : <RetroNotesEditor />}
      trigger={undefined}
      left={undefined}
      right={undefined}
    />
  );
}
