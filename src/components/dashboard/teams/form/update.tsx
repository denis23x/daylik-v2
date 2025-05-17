'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { supabase } from '@/utils/supabase/client';
import { TeamsFormFields } from './form-fields';
import { TeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useTeamsUpsertStore } from '@/store/useTeamsUpsertStore';
import { useUpdateTeam } from '@/hooks/useTeams';

export default function TeammateUpdateForm() {
  const form = useFormContext<z.infer<typeof TeamsFormSchema>>();
  const { mutateAsync } = useUpdateTeam();
  const { team, closeModal } = useTeamsUpsertStore();

  const handleSubmit = async (formData: z.infer<typeof TeamsFormSchema>) => {
    try {
      if (team) {
        if (Object.keys(form.formState.dirtyFields).length) {
          await mutateAsync({
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
          const { error } = await supabase
            .from('teams_teammates')
            .delete()
            .in('teammateUUID', toRemove)
            .eq('teamUUID', team.UUID);

          if (error) {
            toast.error(error.message);
            return;
          }
        }

        if (toAdd.length) {
          const teamTeammateRelations = toAdd.map((teammateUUID) => ({
            teamUUID: team.UUID,
            teammateUUID,
          }));

          const { error } = await supabase.from('teams_teammates').insert(teamTeammateRelations);

          if (error) {
            toast.error(error.message);
            return;
          }
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
