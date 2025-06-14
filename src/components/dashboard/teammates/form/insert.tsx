'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { useCreateTeammate } from '@/hooks/useTeammates';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { TeammatesFormFields } from './form-fields';
import { TeammatesFormSchema } from './form-schema';
import { z } from 'zod';
import { useAddTeamsToTeammate } from '@/hooks/useTeamsTeammates';

export default function TeammateInsertForm() {
  const form = useFormContext<z.infer<typeof TeammatesFormSchema>>();
  const { mutateAsync: createTeammate } = useCreateTeammate();
  const { mutateAsync: addTeamsToTeammate } = useAddTeamsToTeammate();
  const { closeModal } = useTeammatesStore();

  const handleSubmit = async (formData: z.infer<typeof TeammatesFormSchema>) => {
    try {
      const teammate = await createTeammate({
        name: formData.name,
        role: formData.role,
        avatar: formData.avatar || null,
        color: formData.color,
      });

      await addTeamsToTeammate({
        teammateUUID: teammate.UUID,
        teams: formData.teams,
      });

      // Close modal
      closeModal();

      // Success message
      toast.success('Teammate created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <Form {...form}>
      <form id="teammate-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <TeammatesFormFields />
      </form>
    </Form>
  );
}
