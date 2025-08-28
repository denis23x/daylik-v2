import {
  createPokerIssue,
  deletePokerIssue,
  fetchPokerIssues,
  updatePokerIssue,
} from '@/lib/api/pokerIssues';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePokerIssues({ query, pokerUUID }: { query: string; pokerUUID: string }) {
  return useQuery({
    queryKey: ['poker_issues', query, pokerUUID],
    queryFn: () => fetchPokerIssues({ query, pokerUUID }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreatePokerIssue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPokerIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poker_issues'] });
    },
  });
}

export function useUpdatePokerIssue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePokerIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poker_issues'] });
    },
  });
}

export function useDeletePokerIssue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePokerIssue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poker_issues'] });
    },
  });
}
