import { fetchTeams, createTeam, updateTeam, deleteTeam } from '@/lib/api/teams';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTeams(query: string = '*') {
  return useQuery({
    queryKey: ['teams', query],
    queryFn: () => fetchTeams(query),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}
