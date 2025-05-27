'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useSyncStore } from '@/store/useSyncStore';

export default function SyncModal() {
  const { isOpen, closeModal } = useSyncStore();

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !open && closeModal()}
      title={'Title'}
      description={'Description'}
      content={
        <div>
          <h1>Sync Settings</h1>
        </div>
      }
      trigger={undefined}
      extraActions={undefined}
      actions={
        <Button type="submit" form="teammate-form">
          Update
        </Button>
      }
    />
  );
}
