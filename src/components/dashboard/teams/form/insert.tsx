'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { supabase } from '@/utils/supabase/client';
import { TeamsFormFields } from './form-fields';
import { TeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useCreateTeam } from '@/hooks/useTeams';
import { useTeamsUpsertStore } from '@/store/useTeamsUpsertStore';

export default function TeammateInsertForm() {
  const form = useFormContext<z.infer<typeof TeamsFormSchema>>();
  const { mutateAsync } = useCreateTeam();
  const { closeModal } = useTeamsUpsertStore();

  const handleSubmit = async (formData: z.infer<typeof TeamsFormSchema>) => {
    alert('handleSubmit');
    try {
      const team = await mutateAsync({
        name: formData.name,
      });

      const teammateTeamRelations = formData.teammates.map((teammateUUID) => ({
        teamUUID: team.UUID,
        teammateUUID,
      }));

      await supabase.from('teams_teammates').insert(teammateTeamRelations);

      // Success message
      toast.success('Team created');
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
