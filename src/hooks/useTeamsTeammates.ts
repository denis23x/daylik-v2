import {
  updateTeammatesOrderInTeam,
  fetchTeammatesFromTeam,
  addTeammatesToTeam,
  removeTeammatesFromTeam,
  fetchTeamsToTeammate,
  addTeamsToTeammate,
  removeTeamsFromTeammate,
} from '@/lib/api/teamsTeammates';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

export function useUpdateTeammatesInTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTeammatesOrderInTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useTeammatesFromTeam({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['teams_teammates', UUID],
    queryFn: () => fetchTeammatesFromTeam({ query, UUID }),
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });
}

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
    onSuccess: (_, variables) => {
      if (!variables.teammatesDisableInvalidateQueries) {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    },
  });
}

export function useTeamsToTeammate({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['teams_teammates', UUID],
    queryFn: () => fetchTeamsToTeammate({ query, UUID }),
    staleTime: 1000 * 60 * 5,
    enabled: false,
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
    onSuccess: (_, variables) => {
      if (!variables.teamsDisableInvalidateQueries) {
        queryClient.invalidateQueries({ queryKey: ['teams'] });
      }
    },
  });
}
