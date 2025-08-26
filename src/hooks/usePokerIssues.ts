import { fetchPokerIssues } from '@/lib/api/pokerIssues';
import { useQuery } from '@tanstack/react-query';

export function usePokerIssues({ query, pokerUUID }: { query: string; pokerUUID: string }) {
  return useQuery({
    queryKey: ['poker_issues', query, pokerUUID],
    queryFn: () => fetchPokerIssues({ query, pokerUUID }),
    staleTime: 1000 * 60 * 5,
  });
}
