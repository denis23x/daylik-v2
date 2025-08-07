import { fetchTeamsFromAnalytic } from '@/lib/api/analyticsTeams';
import { normalizeAnalyticsTeams } from '@/utils/normalizeAnalyticsTeams';
import { useQuery } from '@tanstack/react-query';

export function useTeamsFromAnalytic({
  query,
  gte,
  lte,
}: {
  query: string;
  gte?: string;
  lte?: string;
}) {
  return useQuery({
    queryKey: ['analytics', query, gte, lte],
    queryFn: () => fetchTeamsFromAnalytic({ query, gte, lte }),
    staleTime: 1000 * 60 * 5,
    select: (data) => normalizeAnalyticsTeams(data),
  });
}
