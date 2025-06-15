import { fetchTeamsFromAnalytic } from '@/lib/api/analyticsTeams';
import { normalizeAnalyticTeams } from '@/utils/normalizeAnalyticTeams';
import { useQuery } from '@tanstack/react-query';

export function useTeamsFromAnalytic({ query }: { query: string }) {
  return useQuery({
    queryKey: ['analytics', query],
    queryFn: () => fetchTeamsFromAnalytic({ query }),
    staleTime: 1000 * 60 * 5,
    select: (data) => normalizeAnalyticTeams(data),
  });
}
