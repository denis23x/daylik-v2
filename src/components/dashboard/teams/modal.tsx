'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import TeamInsertForm from './form/insert';
import TeamUpdateForm from './form/update';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTeamsFormSchema } from './form/form-schema';
import { Button } from '@/components/ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTeamsStore } from '@/store/useTeamsStore';
import { toast } from 'sonner';
import { useDeleteTeam } from '@/hooks/useTeams';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { Form as FormProvider } from '@/components/ui/form';
import { getFilePath } from '@/lib/api/files';
import { BUCKET_IMAGES } from '@/lib/constants';
import { useDeleteFiles } from '@/hooks/useFiles';
import { useTranslations } from 'next-intl';

export default function TeamsModal() {
  const t = useTranslations('components.dashboard.teams');
  const { isOpen, mode, team, closeModal } = useTeamsStore();
  const { mutateAsync: deleteTeam } = useDeleteTeam();
  const { mutate: deleteFiles } = useDeleteFiles();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const isUpdate = mode === 'update';

  const form = useForm<z.infer<ReturnType<typeof createTeamsFormSchema>>>({
    defaultValues: {
      name: '',
      teammates: [],
      image: null,
    },
    resolver: zodResolver(createTeamsFormSchema(t)),
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && team) {
        form.reset({
          name: team.name,
          teammates: team.teammates as string[],
          image: team.image ?? null,
        });
      }

      if (mode === 'insert') {
        form.reset({
          name: '',
          teammates: [],
          image: null,
        });
      }
    } else {
      // Reset form when modal is closed
      form.reset();
    }
  }, [mode, team, form, isOpen]);

  const handleDelete = async () => {
    if (team) {
      try {
        await deleteTeam(team.UUID);

        // Delete image if it exists, sync method
        if (team.image) {
          deleteFiles({ bucket: BUCKET_IMAGES, paths: [getFilePath(team.image)] });
        }

        // Close modal
        closeModal();

        // Success message
        toast.success(t('modal.messages.deleted', { teamName: team.name }));
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
            {isUpdate ? <TeamUpdateForm /> : <TeamInsertForm />}
          </FormProvider>
          <ConfirmDialog
            title={t('modal.confirm.title')}
            description={t('modal.confirm.description')}
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
        <Button type="submit" form="team-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting
            ? t('modal.loading')
            : isUpdate
              ? t('modal.updateButton')
              : t('modal.insertButton')}
        </Button>
      }
    />
  );
}
