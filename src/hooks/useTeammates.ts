import {
  fetchTeammates,
  createTeammate,
  updateTeammate,
  deleteTeammate,
} from '@/lib/api/teammates';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useTeammates(query: string = '*') {
  return useQuery({
    queryKey: ['teammates', query],
    queryFn: () => fetchTeammates(query),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateTeammate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTeammate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teammates'] });
    },
  });
}

export function useUpdateTeammate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTeammate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teammates'] });
    },
  });
}

export function useDeleteTeammate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTeammate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teammates'] });
    },
  });
}
