import {
  addTeammatesToTeam,
  removeTeammatesFromTeam,
  addTeamsToTeammate,
  removeTeamsFromTeammate,
} from '@/lib/api/teamsTeammates';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

export function useAddTeammatesToTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTeammatesToTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useRemoveTeammatesFromTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTeammatesFromTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useAddTeamsToTeammate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTeamsToTeammate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useRemoveTeamsFromTeammate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeTeamsFromTeammate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}
