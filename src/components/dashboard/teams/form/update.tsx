'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { TeamsFormFields } from './form-fields';
import { TeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useTeamsUpsertStore } from '@/store/useTeamsUpsertStore';
import { useUpdateTeam } from '@/hooks/useTeams';
import { useAddTeammatesToTeam, useRemoveTeammatesFromTeam } from '@/hooks/useTeamsTeammates';

export default function TeammateUpdateForm() {
  const form = useFormContext<z.infer<typeof TeamsFormSchema>>();
  const { mutateAsync: updateTeam } = useUpdateTeam();
  const { mutateAsync: addTeammatesToTeam } = useAddTeammatesToTeam();
  const { mutateAsync: removeTeammatesFromTeam } = useRemoveTeammatesFromTeam();
  const { team, closeModal } = useTeamsUpsertStore();

  const handleSubmit = async (formData: z.infer<typeof TeamsFormSchema>) => {
    try {
      if (team) {
        if (Object.keys(form.formState.dirtyFields).length) {
          await updateTeam({
            UUID: team.UUID,
            name: formData.name,
          });
        }

        // Update teams relations
        const oldTeammates: string[] = team.teammates as string[];
        const newTeammates: string[] = formData.teammates;
        const toRemove = oldTeammates.filter((UUID) => !newTeammates.includes(UUID));
        const toAdd = newTeammates.filter((UUID) => !oldTeammates.includes(UUID));

        if (toRemove.length) {
          await removeTeammatesFromTeam({
            teamUUID: team.UUID,
            teammates: toRemove,
            teammatesDisableInvalidateQueries: !!toAdd.length,
          });
        }

        if (toAdd.length) {
          await addTeammatesToTeam({
            teamUUID: team.UUID,
            teammates: toAdd,
          });
        }

        // Success message
        toast.success('Team updated');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      closeModal();
    }
  };

  return (
    <Form {...form}>
      <form id="team-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <TeamsFormFields />
      </form>
    </Form>
  );
}
