import { createPoker, fetchPoker } from '@/lib/api/poker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function usePoker({ query, gte, lte }: { query: string; gte?: string; lte?: string }) {
  return useQuery({
    queryKey: ['poker', query, gte, lte],
    queryFn: () => fetchPoker({ query, gte, lte }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreatePoker() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPoker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['poker'] });
    },
  });
}
