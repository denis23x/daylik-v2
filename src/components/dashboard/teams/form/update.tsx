'use client';

import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';
import { TeamsFormFields } from './form-fields';
import { createTeamsFormSchema } from './form-schema';
import { z } from 'zod';
import { useTeamsStore } from '@/store/useTeamsStore';
import { useUpdateTeam } from '@/hooks/useTeams';
import { useAddTeammatesToTeam, useRemoveTeammatesFromTeam } from '@/hooks/useTeamsTeammates';
import { useDeleteFiles } from '@/hooks/useFiles';
import { getFilePath } from '@/lib/api/files';
import { BUCKET_IMAGES } from '@/lib/constants';
import { useAutoScroll } from '@/hooks/ui/useAutoScroll';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

export default function TeammateUpdateForm() {
  const t = useTranslations('components.dashboard.teams.form.messages');
  const form = useFormContext<z.infer<ReturnType<typeof createTeamsFormSchema>>>();
  const { mutateAsync: updateTeam } = useUpdateTeam();
  const { mutateAsync: addTeammatesToTeam } = useAddTeammatesToTeam();
  const { mutateAsync: removeTeammatesFromTeam } = useRemoveTeammatesFromTeam();
  const { team, closeModal } = useTeamsStore();
  const { mutate: deleteFiles } = useDeleteFiles();
  const { scrollTo } = useAutoScroll();
  const queryClient = useQueryClient();

  const handleSubmit = async (formData: z.infer<ReturnType<typeof createTeamsFormSchema>>) => {
    if (team) {
      try {
        if (Object.keys(form.formState.dirtyFields).length) {
          const updatedTeam = await updateTeam({
            UUID: team.UUID,
            name: formData.name,
            image: formData.image || null,
          });

          // Scroll to new teammate
          scrollTo(updatedTeam.UUID);

          // Invalidate queries
          queryClient.invalidateQueries({ queryKey: ['teammates'] });
          queryClient.invalidateQueries({ queryKey: ['analytics'] });
        }

        // Update teams relations
        const oldTeammates: string[] = team.teammates as string[];
        const newTeammates: string[] = formData.teammates;
        const toRemove = oldTeammates.filter((UUID) => !newTeammates.includes(UUID));
        const toAdd = newTeammates.filter((UUID) => !oldTeammates.includes(UUID));

        if (toRemove.length) {
          await removeTeammatesFromTeam({
            teamUUID: team.UUID,
            teammates: toRemove,
            teammatesDisableInvalidateQueries: !!toAdd.length,
          });
        }

        if (toAdd.length) {
          await addTeammatesToTeam({
            teamUUID: team.UUID,
            teammates: toAdd,
          });
        }

        // Delete image if it exists, sync method
        if (team.image && team.image !== formData.image) {
          deleteFiles({ bucket: BUCKET_IMAGES, paths: [getFilePath(team.image)] });
        }

        // Close modal
        closeModal();

        // Success message
        if (team.name !== formData.name) {
          toast.success(t('nameChange', { newName: formData.name, oldName: team.name }));
        } else {
          toast.success(t('updated', { teamName: team.name }));
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : t('error'));
      }
    }
  };

  return (
    <form id="team-form" className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <TeamsFormFields />
    </form>
  );
}
