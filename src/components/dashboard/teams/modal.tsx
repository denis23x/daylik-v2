'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import TeamInsertForm from './form/insert';
import TeamUpdateForm from './form/update';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeamsFormSchema } from './form/form-schema';
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

export default function TeamsModal() {
  const { isOpen, mode, team, closeModal } = useTeamsStore();
  const { mutateAsync: deleteTeam } = useDeleteTeam();
  const { mutate: deleteFiles } = useDeleteFiles();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const form = useForm<z.infer<typeof TeamsFormSchema>>({
    defaultValues: {
      name: '',
      teammates: [],
      image: null,
    },
    resolver: zodResolver(TeamsFormSchema),
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
        toast.success(`Poof! ${team.name} disbanded`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      }
    }
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !form.formState.isSubmitting && !open && closeModal()}
      disabled={form.formState.isSubmitting}
      title={mode === 'update' ? 'Edit Team' : 'Create Team'}
      description={
        mode === 'update'
          ? 'Edit team info and manage their members.'
          : 'Create a new team to start collaborating with your members.'
      }
      content={
        <FormProvider {...form}>
          {mode === 'update' ? <TeamUpdateForm /> : <TeamInsertForm />}
          <ConfirmDialog
            title="Are you absolutely sure?"
            description="This action cannot be undone."
            open={isConfirmOpen}
            onOpenChange={setIsConfirmOpen}
            onConfirmAction={form.handleSubmit(handleDelete)}
          />
        </FormProvider>
      }
      trigger={undefined}
      left={
        mode === 'update' ? (
          <Button
            type="button"
            variant="destructive"
            disabled={form.formState.isSubmitting}
            onClick={() => setIsConfirmOpen(true)}
          >
            <Trash2 className="hidden sm:block" />
            Delete
          </Button>
        ) : undefined
      }
      right={
        <Button type="submit" form="team-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting ? 'Please wait' : mode === 'update' ? 'Update' : 'Create'}
        </Button>
      }
    />
  );
}
