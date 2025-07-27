'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { useCreateTeammate } from '@/hooks/useTeammates';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { TeammatesFormFields } from './form-fields';
import { createTeammatesFormSchema } from './form-schema';
import { z } from 'zod';
import { useAddTeamsToTeammate } from '@/hooks/useTeamsTeammates';
import { useAutoScroll } from '@/hooks/ui/useAutoScroll';
import { useTranslations } from 'next-intl';

export default function TeammateInsertForm() {
  const t = useTranslations('components.dashboard.teammates.form.messages');
  const form = useFormContext<z.infer<ReturnType<typeof createTeammatesFormSchema>>>();
  const { mutateAsync: createTeammate } = useCreateTeammate();
  const { mutateAsync: addTeamsToTeammate } = useAddTeamsToTeammate();
  const { closeModal } = useTeammatesStore();
  const { scrollTo } = useAutoScroll();

  const handleSubmit = async (formData: z.infer<ReturnType<typeof createTeammatesFormSchema>>) => {
    try {
      const teammate = await createTeammate({
        name: formData.name,
        role: formData.role,
        avatar: formData.avatar || null,
        color: formData.color,
      });

      // Scroll to new teammate
      scrollTo(teammate.UUID);

      await addTeamsToTeammate({
        teammateUUID: teammate.UUID,
        teams: formData.teams,
      });

      // Close modal
      closeModal();

      // Success message
      toast.success(t('created', { teammateName: teammate.name }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('error'));
    }
  };

  return (
    <form id="teammate-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <TeammatesFormFields />
    </form>
  );
}
