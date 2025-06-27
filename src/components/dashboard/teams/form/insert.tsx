'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { TeamsFormFields } from './form-fields';
import { TeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useCreateTeam } from '@/hooks/useTeams';
import { useTeamsStore } from '@/store/useTeamsStore';
import { useAddTeammatesToTeam } from '@/hooks/useTeamsTeammates';

export default function TeammateInsertForm() {
  const form = useFormContext<z.infer<typeof TeamsFormSchema>>();
  const { mutateAsync: createTeam } = useCreateTeam();
  const { mutateAsync: addTeammatesToTeam } = useAddTeammatesToTeam();
  const { closeModal } = useTeamsStore();

  const handleSubmit = async (formData: z.infer<typeof TeamsFormSchema>) => {
    try {
      const team = await createTeam({
        name: formData.name,
        image: formData.image || null,
      });

      await addTeammatesToTeam({
        teamUUID: team.UUID,
        teammates: formData.teammates,
      });

      // Close modal
      closeModal();

      // Success message
      toast.success(`${team.name} is online!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <form id="team-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <TeamsFormFields />
    </form>
  );
}
