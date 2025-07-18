'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import TeammateInsertForm from './form/insert';
import TeammateUpdateForm from './form/update';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRandomHexColor } from '@/hooks/ui/useRandomHexColor';
import { TeammatesFormSchema } from './form/form-schema';
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

export default function TeammatesModal() {
  const { isOpen, mode, teammate, closeModal } = useTeammatesStore();
  const { generateRandomHex } = useRandomHexColor();
  const { mutateAsync: deleteTeammate } = useDeleteTeammate();
  const { mutate: deleteFiles } = useDeleteFiles();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof TeammatesFormSchema>>({
    defaultValues: {
      name: '',
      role: '',
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
        toast.success(`${teammate.name} has left the building`);
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
      title={mode === 'update' ? 'Update Teammate' : 'Add Teammate'}
      description={
        mode === 'update'
          ? 'Update teammate info and manage their teams.'
          : 'Add a new teammate to start collaborating with your team.'
      }
      content={
        <>
          <FormProvider {...form}>
            {mode === 'update' ? <TeammateUpdateForm /> : <TeammateInsertForm />}
          </FormProvider>
          <ConfirmDialog
            title="Are you absolutely sure?"
            description="This action cannot be undone."
            open={isConfirmOpen}
            onOpenChange={setIsConfirmOpen}
            onConfirmAction={form.handleSubmit(handleDelete)}
          />
        </>
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
        <Button type="submit" form="teammate-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting ? 'Please wait' : mode === 'update' ? 'Update' : 'Add'}
        </Button>
      }
    />
  );
}
