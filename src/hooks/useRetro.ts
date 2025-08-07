import { fetchRetro } from '@/lib/api/retro';
import { useQuery } from '@tanstack/react-query';

export function useRetro({ query, gte, lte }: { query: string; gte: string; lte: string }) {
  return useQuery({
    queryKey: ['retro', query, gte, lte],
    queryFn: () => fetchRetro({ query, gte, lte }),
    staleTime: 1000 * 60 * 5,
  });
}
