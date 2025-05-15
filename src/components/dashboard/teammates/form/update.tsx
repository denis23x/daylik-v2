'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { useUpdateTeammate } from '@/hooks/useTeammates';
import { useTeammateUpsertStore } from '@/store/useTeammateUpsertStore';
import { supabase } from '@/utils/supabase/client';
import { TeammatesFormFields } from './form-fields';
import { TeammatesFormSchema } from './form-schema';
import { z } from 'zod';

export default function TeammateUpdateForm() {
  const form = useFormContext<z.infer<typeof TeammatesFormSchema>>();
  const { mutateAsync: updateTeammate } = useUpdateTeammate();
  const { teammate, closeModal } = useTeammateUpsertStore();

  const handleSubmit = async (formData: z.infer<typeof TeammatesFormSchema>) => {
    try {
      if (teammate?.UUID) {
        await updateTeammate({
          UUID: teammate.UUID,
          name: formData.name,
          position: formData.position,
          avatar: formData.avatar || null,
          color: formData.color,
        });

        // const oldTeamIds = [1, 2, 3];
        // const newTeamIds = [2, 3, 4];

        // // Удаляем связи, которых больше нет
        // const toRemove = oldTeamIds.filter((id) => !newTeamIds.includes(id));

        // // Добавляем только новые
        // const toAdd = newTeamIds
        //   .filter((id) => !oldTeamIds.includes(id))
        //   .map((team_id) => ({
        //     team_id,
        //     teammate_id: userId,
        //   }));

        // if (toRemove.length > 0) {
        //   await supabase
        //     .from('teams_teammates')
        //     .delete()
        //     .in('team_id', toRemove)
        //     .eq('teammate_id', userId);
        // }

        // if (toAdd.length > 0) {
        //   await supabase.from('teams_teammates').insert(toAdd);
        // }

        await supabase.from('teams_teammates').delete().eq('teammateUUID', teammate.UUID);

        const teammateTeamRelations = (formData.teams ?? []).map((teamUUID: string) => ({
          teamUUID,
          teammateUUID: teammate.UUID,
        }));

        await supabase.from('teams_teammates').insert(teammateTeamRelations);

        // Success message
        toast.success('Teammate updated');
      }
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
