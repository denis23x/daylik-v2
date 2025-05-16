import {
  fetchTeammates,
  createTeammate,
  updateTeammate,
  deleteTeammate,
} from '@/lib/api/teammates';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';

export function useTeammates(user: User | null, query: string = '*') {
  return useQuery({
    queryKey: ['teammates'],
    queryFn: () => fetchTeammates(user!, query),
    enabled: !!user,
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
