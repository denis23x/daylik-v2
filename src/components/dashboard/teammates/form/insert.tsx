'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { useCreateTeammate } from '@/hooks/useTeammates';
import { useAuth } from '@/context/AuthProvider';
import { supabase } from '@/utils/supabase/client';
import { useTeammatesUpsertStore } from '@/store/useTeammatesUpsertStore';
import { TeammatesFormFields } from './form-fields';
import { TeammatesFormSchema } from './form-schema';
import { z } from 'zod';

export default function TeammateInsertForm() {
  const form = useFormContext<z.infer<typeof TeammatesFormSchema>>();
  const { user } = useAuth();
  const { mutateAsync } = useCreateTeammate();
  const { closeModal } = useTeammatesUpsertStore();

  const handleSubmit = async (formData: z.infer<typeof TeammatesFormSchema>) => {
    try {
      const teammate = await mutateAsync({
        name: formData.name,
        position: formData.position,
        userUUID: user!.id,
        avatar: formData.avatar || null,
        color: formData.color,
      });

      const teammateTeamRelations = formData.teams.map((teamUUID) => ({
        teamUUID,
        teammateUUID: teammate.UUID,
      }));

      await supabase.from('teams_teammates').insert(teammateTeamRelations);

      // Success message
      toast.success('Teammate created');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      closeModal();
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
