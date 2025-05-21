'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import TeammateInsertForm from './form/insert';
import TeammateUpdateForm from './form/update';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRandomHexColor } from '@/hooks/useRandomHexColor';
import { TeammatesFormSchema } from './form/form-schema';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDeleteTeammate } from '@/hooks/useTeammates';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { useDeleteFile } from '@/hooks/useFiles';

export default function TeammatesModal() {
  const { isOpen, mode, teammate, closeModal } = useTeammatesStore();
  const { generateRandomHex } = useRandomHexColor();
  const { mutateAsync: deleteTeammate } = useDeleteTeammate();
  const { mutateAsync: deleteFile } = useDeleteFile('avatars');
  const queryClient = useQueryClient();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const form = useForm<z.infer<typeof TeammatesFormSchema>>({
    defaultValues: {
      name: '',
      position: '',
      teams: [],
      avatar: null,
      color: '',
    },
    resolver: zodResolver(TeammatesFormSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'update' && teammate) {
        form.reset({
          name: teammate.name,
          position: teammate.position,
          teams: teammate.teams as string[],
          avatar: teammate.avatar ?? null,
          color: teammate.color,
        });
      }

      if (mode === 'insert') {
        form.reset({
          name: '',
          position: '',
          teams: [],
          avatar: '',
          color: generateRandomHex(),
        });
      }
    } else {
      // Reset form when modal is closed
      form.reset();
    }
  }, [mode, teammate, form, isOpen, generateRandomHex]);

  const handleDelete = async () => {
    if (teammate?.UUID) {
      try {
        await deleteTeammate(teammate.UUID);

        // Delete avatar if it exists
        if (teammate.avatar) {
          await deleteFile(teammate.avatar);
        }

        // Invalidate teams queries if the teammate is assigned to any teams
        if (teammate.teams?.length) {
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }

        // Success message
        toast.success('Teammate deleted successfully');
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
      title={mode === 'update' ? 'Update Teammate' : 'Create Teammate'}
      description={
        mode === 'update'
          ? 'Update teammate info and manage their teams.'
          : 'Create a new teammate to start collaborating with your team.'
      }
      content={
        <FormProvider {...form}>
          {mode === 'update' ? <TeammateUpdateForm /> : <TeammateInsertForm />}
          <ConfirmDialog
            title="Are you absolutely sure?"
            description="This action cannot be undone."
            open={isAlertOpen}
            onOpenChange={setIsAlertOpen}
            onConfirmAction={handleDelete}
          />
        </FormProvider>
      }
      trigger={undefined}
      extraActions={
        mode === 'update' ? (
          <Button variant="destructive" onClick={() => setIsAlertOpen(true)}>
            Delete
          </Button>
        ) : undefined
      }
      actions={
        <Button type="submit" form="teammate-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting ? 'Please wait' : mode === 'update' ? 'Update' : 'Create'}
        </Button>
      }
    />
  );
}
