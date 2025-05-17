'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { TeamsFormFields } from './form-fields';
import { TeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useCreateTeam } from '@/hooks/useTeams';
import { useTeamsUpsertStore } from '@/store/useTeamsUpsertStore';
import { useAddTeammatesToTeam } from '@/hooks/useTeamsTeammates';

export default function TeammateInsertForm() {
  const form = useFormContext<z.infer<typeof TeamsFormSchema>>();
  const { mutateAsync: createTeam } = useCreateTeam();
  const { mutateAsync: addTeammatesToTeam } = useAddTeammatesToTeam();
  const { closeModal } = useTeamsUpsertStore();

  const handleSubmit = async (formData: z.infer<typeof TeamsFormSchema>) => {
    try {
      const team = await createTeam({
        name: formData.name,
      });

      await addTeammatesToTeam({
        teamUUID: team.UUID,
        teammates: formData.teammates,
      });

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
