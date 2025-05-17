'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import TeamInsertForm from './form/insert';
import TeamUpdateForm from './form/update';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeamsFormSchema } from './form/form-schema';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useTeamsUpsertStore } from '@/store/useTeamsUpsertStore';
import { toast } from 'sonner';
import { useDeleteTeam } from '@/hooks/useTeams';

export default function TeamsUpsert() {
  const { isOpen, mode, team, closeModal } = useTeamsUpsertStore();
  const { mutateAsync: deleteTeam } = useDeleteTeam();

  const form = useForm<z.infer<typeof TeamsFormSchema>>({
    defaultValues: {
      name: '',
      teammates: [],
    },
    resolver: zodResolver(TeamsFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && team) {
        form.reset({
          name: team.name,
          teammates: team.teammates as string[],
        });
      }

      if (mode === 'insert') {
        form.reset({
          name: '',
          teammates: [],
        });
      }
    } else {
      // Reset form when modal is closed
      form.reset();
    }
  }, [mode, team, form, isOpen]);

  const handleDelete = async () => {
    if (team?.UUID) {
      try {
        await deleteTeam(team.UUID);

        // Success message
        toast.success('Team deleted successfully');
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        closeModal();
      }
    }
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !form.formState.isSubmitting && !open && closeModal()}
      title={mode === 'update' ? 'Update Team' : 'Create Team'}
      description={
        mode === 'update'
          ? 'Update team info and manage their members.'
          : 'Create a new team to start collaborating with your members.'
      }
      content={
        <FormProvider {...form}>
          {mode === 'update' ? <TeamUpdateForm /> : <TeamInsertForm />}
        </FormProvider>
      }
      trigger={undefined}
      extraActions={
        mode === 'update' ? (
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        ) : undefined
      }
      actions={
        <Button type="submit" form="team-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting ? 'Please wait' : mode === 'update' ? 'Update' : 'Create'}
        </Button>
      }
    />
  );
}
