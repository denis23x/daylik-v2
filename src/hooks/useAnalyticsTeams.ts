import { fetchTeamsFromAnalytic } from '@/lib/api/analyticsTeams';
import { normalizeAnalyticsTeams } from '@/utils/normalizeAnalyticsTeams';
import { useQuery } from '@tanstack/react-query';

export function useTeamsFromAnalytic({ query }: { query: string }) {
  return useQuery({
    queryKey: ['analytics', query],
    queryFn: () => fetchTeamsFromAnalytic({ query }),
    staleTime: 1000 * 60 * 5,
    select: (data) => normalizeAnalyticsTeams(data),
  });
}
