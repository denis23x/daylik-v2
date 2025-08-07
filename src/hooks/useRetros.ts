import { createRetro, fetchRetros } from '@/lib/api/retros';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useRetros({ query, gte, lte }: { query: string; gte?: string; lte?: string }) {
  return useQuery({
    queryKey: ['retros', query, gte, lte],
    queryFn: () => fetchRetros({ query, gte, lte }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateRetro() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRetro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retros'] });
    },
  });
}
