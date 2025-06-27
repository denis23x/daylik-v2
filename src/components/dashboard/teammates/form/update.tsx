'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateTeammate } from '@/hooks/useTeammates';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { TeammatesFormFields } from './form-fields';
import { TeammatesFormSchema } from './form-schema';
import { z } from 'zod';
import { useAddTeamsToTeammate, useRemoveTeamsFromTeammate } from '@/hooks/useTeamsTeammates';
import { useQueryClient } from '@tanstack/react-query';

export default function TeammateUpdateForm() {
  const form = useFormContext<z.infer<typeof TeammatesFormSchema>>();
  const { mutateAsync: updateTeammate } = useUpdateTeammate();
  const { mutateAsync: addTeamsToTeammate } = useAddTeamsToTeammate();
  const { mutateAsync: removeTeamsFromTeammate } = useRemoveTeamsFromTeammate();
  const { teammate, closeModal } = useTeammatesStore();
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: z.infer<typeof TeammatesFormSchema>) => {
    if (teammate) {
      try {
        if (Object.keys(form.formState.dirtyFields).length) {
          await updateTeammate({
            UUID: teammate.UUID,
            name: formData.name,
            role: formData.role,
            avatar: formData.avatar || null,
            color: formData.color,
          });

          // Invalidate teams queries
          queryClient.invalidateQueries({ queryKey: ['teams'] });
        }

        // Update teams relations
        const oldTeams: string[] = teammate.teams as string[];
        const newTeams: string[] = formData.teams;
        const toRemove = oldTeams.filter((UUID) => !newTeams.includes(UUID));
        const toAdd = newTeams.filter((UUID) => !oldTeams.includes(UUID));

        if (toRemove.length) {
          await removeTeamsFromTeammate({
            teammateUUID: teammate.UUID,
            teams: toRemove,
            teamsDisableInvalidateQueries: !!toAdd.length,
          });
        }

        if (toAdd.length) {
          await addTeamsToTeammate({
            teammateUUID: teammate.UUID,
            teams: toAdd,
          });
        }

        // Close modal
        closeModal();

        // Success message
        toast.success(`${teammate.name} has been patched!`);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An error occurred');
      }
    }
  };

  return (
    <form id="teammate-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <TeammatesFormFields />
    </form>
  );
}
