import { fetchSync } from '@/lib/api/sync';
import { useQuery } from '@tanstack/react-query';

export function useSync({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['sync', query, UUID],
    queryFn: () => fetchSync({ query, UUID }),
    staleTime: 0,
  });
}
