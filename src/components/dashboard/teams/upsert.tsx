'use client';

import ResponsiveDialog from '@/components/responsive-dialog';
import TeamInsertForm from './form/insert';
import TeamUpdateForm from './form/update';
import { z } from 'zod';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TeamsFormSchema } from './form/form-schema';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useTeamUpsertStore } from '@/store/useTeamUpsertStore';

export default function TeamsUpsert() {
  const { isOpen, mode, team, closeModal } = useTeamUpsertStore();

  const form = useForm<z.infer<typeof TeamsFormSchema>>({
    defaultValues: {
      name: '',
      teammates: [],
    },
    resolver: zodResolver(TeamsFormSchema),
  });

  useEffect(() => {
    if (mode === 'update' && team) {
      form.reset({
        name: team.name,
        teammates: team.teammates as string[],
      });
    }

    if (mode === 'insert') {
      form.reset({
        name: '',
        teammates: [],
      });
    }
  }, [mode, team, form]);

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={(open) => !form.formState.isSubmitting && !open && closeModal()}
      title={mode === 'update' ? 'Update Team' : 'Create Team'}
      description={
        mode === 'update'
          ? 'Update team info and manage their members.'
          : 'Create a new team to start collaborating with your members.'
      }
      content={
        <FormProvider {...form}>
          {mode === 'update' ? <TeamUpdateForm /> : <TeamInsertForm />}
        </FormProvider>
      }
      trigger={undefined}
      footer={
        <Button type="submit" form="team-form" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
          {form.formState.isSubmitting ? 'Please wait' : mode === 'update' ? 'Update' : 'Create'}
        </Button>
      }
    />
  );
}
