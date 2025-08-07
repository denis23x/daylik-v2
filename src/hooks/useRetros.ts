import { fetchRetros } from '@/lib/api/retros';
import { useQuery } from '@tanstack/react-query';

export function useRetros({ query, gte, lte }: { query: string; gte?: string; lte?: string }) {
  return useQuery({
    queryKey: ['retros', query, gte, lte],
    queryFn: () => fetchRetros({ query, gte, lte }),
    staleTime: 1000 * 60 * 5,
  });
}
