'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { useUpdateTeammate } from '@/hooks/useTeammates';
import { useTeammatesUpsertStore } from '@/store/useTeammatesUpsertStore';
import { supabase } from '@/utils/supabase/client';
import { TeammatesFormFields } from './form-fields';
import { TeammatesFormSchema } from './form-schema';
import { z } from 'zod';

export default function TeammateUpdateForm() {
  const form = useFormContext<z.infer<typeof TeammatesFormSchema>>();
  const { mutateAsync } = useUpdateTeammate();
  const { teammate, closeModal } = useTeammatesUpsertStore();

  const handleSubmit = async (formData: z.infer<typeof TeammatesFormSchema>) => {
    try {
      if (teammate) {
        if (Object.keys(form.formState.dirtyFields).length) {
          await mutateAsync({
            UUID: teammate.UUID,
            name: formData.name,
            position: formData.position,
            avatar: formData.avatar || null,
            color: formData.color,
          });
        }

        // Update teams relations
        const oldTeams: string[] = teammate.teams as string[];
        const newTeams: string[] = formData.teams;
        const toRemove = oldTeams.filter((UUID) => !newTeams.includes(UUID));
        const toAdd = newTeams.filter((UUID) => !oldTeams.includes(UUID));

        if (toRemove.length) {
          const { error } = await supabase
            .from('teams_teammates')
            .delete()
            .in('teamUUID', toRemove)
            .eq('teammateUUID', teammate.UUID);

          if (error) {
            toast.error(error.message);
            return;
          }
        }

        if (toAdd.length) {
          const teammateTeamRelations = toAdd.map((teamUUID) => ({
            teamUUID,
            teammateUUID: teammate.UUID,
          }));

          const { error } = await supabase.from('teams_teammates').insert(teammateTeamRelations);

          if (error) {
            toast.error(error.message);
            return;
          }
        }

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
