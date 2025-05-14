'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/utils/supabase/client';
import { AlertCircle, FolderOpenIcon, Loader2, Palette } from 'lucide-react';
import ResponsiveDialog from '@/components/responsive-dialog';
import { useRandomHexColor } from '@/hooks/useRandomHexColor';
import { MultiSelect } from '@/components/multi-select';
import FileUploader from '@/components/file-uploader';
import ColorPicker from '@/components/color-picker';
import { useAuth } from '@/context/AuthProvider';
import { useTeammateUpsertStore } from '@/store/useTeammateUpsertStore';
import type { Team } from '@/types/team.type';
import { useTeams } from '@/hooks/useTeams';
import { useCreateTeammate, useUpdateTeammate } from '@/hooks/useTeammates';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  name: z.string().min(2, 'Teammate name must be at least 2 characters'),
  position: z.string().min(2, 'Position must be at least 2 characters'),
  teams: z.array(z.string()),
  avatar: z.string().nullable(),
  color: z.string().min(4, 'Color must be a valid hex code'),
});

const TeammatesUpsert = () => {
  const { user } = useAuth();
  const { data: teams, error } = useTeams(user);
  const { mutateAsync: createTeammate } = useCreateTeammate();
  const { mutateAsync: updateTeammate } = useUpdateTeammate();
  const { color: randomColor } = useRandomHexColor();
  const { isOpen, mode, teammate, closeModal } = useTeammateUpsertStore();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: '',
      position: '',
      teams: [],
      avatar: null,
      color: randomColor,
    },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (mode === 'update' && teammate) {
      form.reset({
        name: teammate.name,
        position: teammate.position,
        teams: teammate.teams?.map((team: Team) => team.UUID) ?? [],
        avatar: teammate.avatar ?? null,
        color: teammate.color,
      });
    }

    if (mode === 'insert') {
      form.reset({
        name: '',
        position: '',
        teams: [],
        avatar: '',
        color: randomColor,
      });
    }
  }, [mode, teammate, form, randomColor]);

  const handleSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      if (mode === 'update' && teammate?.UUID) {
        const { UUID } = await updateTeammate({
          UUID: teammate?.UUID,
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

        // TODO: Move outside ???
        await supabase.from('teams_teammates').delete().eq('teammateUUID', teammate.UUID);

        const teamLinks = (formData.teams ?? []).map((teamUUID) => ({
          teamUUID,
          teammateUUID: UUID,
        }));

        // Add relationships between teams and teammates
        await supabase.from('teams_teammates').insert(teamLinks);

        // Success message
        toast.success('Teammate updated');
      }

      if (mode === 'insert') {
        const { UUID } = await createTeammate({
          name: formData.name,
          position: formData.position,
          userUUID: user?.id as string,
          avatar: formData.avatar || null,
          color: formData.color,
        });

        // TODO: Move outside ???
        const teamLinks = (formData.teams ?? []).map((teamUUID) => ({
          teamUUID,
          teammateUUID: UUID,
        }));

        // Add relationships between teams and teammates
        await supabase.from('teams_teammates').insert(teamLinks);

        // Success message
        toast.success('Teammate created');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      closeModal();
    }
  };

  return (
    <FormProvider {...form}>
      <ResponsiveDialog
        title={mode === 'update' ? 'Update Teammate' : 'Create Teammate'}
        trigger={<div>this is the trigger</div>}
        description={
          mode === 'update'
            ? 'Update teammate info and manage their teams.'
            : 'Create a new teammate to start collaborating with your team.'
        }
        open={isOpen}
        onOpenChange={(open) => !form.formState.isSubmitting && !open && closeModal()}
        content={
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Teammate name"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Position <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Position"
                        {...field}
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Failed to load teams list, please try again later
                  </AlertDescription>
                </Alert>
              )}
              {teams && teams.length > 0 && (
                <MultiSelect
                  name="teams"
                  label="Teams"
                  placeholder="Select teams (optional)"
                  searchPlaceholder="Search"
                  emptyMessage="No team found"
                  items={teams.map((team) => ({
                    key: team.UUID,
                    value: team.UUID,
                    label: team.name,
                  }))}
                />
              )}
              <div className="flex items-end justify-end gap-4">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Avatar</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Avatar URL"
                          {...field}
                          value={field.value || ''}
                          disabled={form.formState.isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FileUploader name="avatar">
                  <Button variant="outline" size="icon">
                    <FolderOpenIcon className="h-5 w-5" />
                  </Button>
                </FileUploader>
                <ColorPicker name="color">
                  <Button variant="outline" size="icon">
                    <Palette className="h-5 w-5" />
                  </Button>
                </ColorPicker>
              </div>
            </form>
          </Form>
        }
        footer={
          <Button
            type="button"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Loader2 className="mr-2 animate-spin" />}
            {form.formState.isSubmitting ? 'Please wait' : mode === 'update' ? 'Update' : 'Create'}
          </Button>
        }
      />
    </FormProvider>
  );
};

export default TeammatesUpsert;
