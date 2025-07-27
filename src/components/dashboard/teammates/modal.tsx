'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import TeammateInsertForm from './form/insert';
import TeammateUpdateForm from './form/update';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRandomHexColor } from '@/hooks/ui/useRandomHexColor';
import { createTeammatesFormSchema } from './form/form-schema';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDeleteTeammate } from '@/hooks/useTeammates';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useDeleteFiles } from '@/hooks/useFiles';
import { getFilePath } from '@/lib/api/files';
import { Form as FormProvider } from '@/components/ui/form';
import { BUCKET_IMAGES } from '@/lib/constants';
import { useTranslations } from 'next-intl';

export default function TeammatesModal() {
  const t = useTranslations('components.dashboard.teammates');
  const { isOpen, mode, teammate, closeModal } = useTeammatesStore();
  const { generateRandomHex } = useRandomHexColor();
  const { mutateAsync: deleteTeammate } = useDeleteTeammate();
  const { mutate: deleteFiles } = useDeleteFiles();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const queryClient = useQueryClient();
  const isUpdate = mode === 'update';

  const form = useForm<z.infer<ReturnType<typeof createTeammatesFormSchema>>>({
    defaultValues: {
      name: '',
      role: '',
      teams: [],
      avatar: null,
      color: '',
    },
    resolver: zodResolver(createTeammatesFormSchema(t)),
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && teammate) {
        form.reset({
          name: teammate.name,
          role: teammate.role,
          teams: teammate.teams as string[],
          avatar: teammate.avatar ?? null,
          color: teammate.color,
        });
      }

      if (mode === 'insert') {
        form.reset({
          name: '',
          role: '',
          teams: [],
          avatar: null,
          color: generateRandomHex(),
        });
      }
    } else {
      // Reset form when modal is closed
      form.reset();
    }
  }, [mode, teammate, form, isOpen, generateRandomHex]);

  const handleDelete = async () => {
    if (teammate) {
      try {
        await deleteTeammate(teammate.UUID);

        // Delete avatar if it exists, sync method
        if (teammate.avatar) {
          deleteFiles({ bucket: BUCKET_IMAGES, paths: [getFilePath(teammate.avatar)] });
        }

        // Invalidate teams queries if the teammate is assigned to any teams
        if (teammate.teams?.length) {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }

        // Close modal
        closeModal();

        // Success message
        toast.success(t('modal.messages.deleted', { teammateName: teammate.name }));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('modal.messages.error'));
      }
    }
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !form.formState.isSubmitting && !open && closeModal()}
      disabled={form.formState.isSubmitting}
      title={t(`modal.${mode}.title`)}
      description={t(`modal.${mode}.description`)}
      content={
        <>
          <FormProvider {...form}>
            {isUpdate ? <TeammateUpdateForm /> : <TeammateInsertForm />}
          </FormProvider>
          <ConfirmDialog
            title={t('modal.confirmDialog.title')}
            description={t('modal.confirmDialog.description')}
            open={isConfirmOpen}
            onOpenChange={setIsConfirmOpen}
            onConfirmAction={form.handleSubmit(handleDelete)}
          />
        </>
      }
      trigger={undefined}
      left={
        isUpdate ? (
          <Button
            type="button"
            variant="destructive"
            disabled={form.formState.isSubmitting}
            onClick={() => setIsConfirmOpen(true)}
          >
            <Trash2 className="hidden sm:block" />
            {t('modal.deleteButton')}
          </Button>
        ) : undefined
      }
      right={
        <Button type="submit" form="teammate-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting
            ? t('modal.loading')
            : isUpdate
              ? t('modal.updateButton')
              : t('modal.addButton')}
        </Button>
      }
    />
  );
}
