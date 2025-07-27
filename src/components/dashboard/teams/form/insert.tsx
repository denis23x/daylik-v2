'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { TeamsFormFields } from './form-fields';
import { createTeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useCreateTeam } from '@/hooks/useTeams';
import { useTeamsStore } from '@/store/useTeamsStore';
import { useAddTeammatesToTeam } from '@/hooks/useTeamsTeammates';
import { useAutoScroll } from '@/hooks/ui/useAutoScroll';
import { useTranslations } from 'next-intl';

export default function TeammateInsertForm() {
  const t = useTranslations('components.dashboard.teams.form.messages');
  const form = useFormContext<z.infer<ReturnType<typeof createTeamsFormSchema>>>();
  const { mutateAsync: createTeam } = useCreateTeam();
  const { mutateAsync: addTeammatesToTeam } = useAddTeammatesToTeam();
  const { closeModal } = useTeamsStore();
  const { scrollTo } = useAutoScroll();

  const handleSubmit = async (formData: z.infer<ReturnType<typeof createTeamsFormSchema>>) => {
    try {
      const team = await createTeam({
        name: formData.name,
        image: formData.image || null,
      });

      // Scroll to new team
      scrollTo(team.UUID);

      await addTeammatesToTeam({
        teamUUID: team.UUID,
        teammates: formData.teammates,
      });

      // Close modal
      closeModal();

      // Success message
      toast.success(t('created', { teamName: team.name }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('error'));
    }
  };

  return (
    <form id="team-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <TeamsFormFields />
    </form>
  );
}
