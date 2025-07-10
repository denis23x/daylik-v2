import { fetchSync } from '@/lib/api/sync';
import { normalizeTeammate } from '@/utils/normalizeTeammate';
import { useQuery } from '@tanstack/react-query';

export function useSync({
  query,
  UUID,
  enabled,
}: {
  query: string;
  UUID: string;
  enabled: boolean;
}) {
  return useQuery({
    queryKey: ['sync', query, UUID],
    queryFn: () => fetchSync({ query, UUID }),
    staleTime: 0,
    enabled,
    select: (data) => normalizeTeammate(data),
  });
}
