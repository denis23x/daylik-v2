import { createRetroMessage, fetchRetrosMessages } from '@/lib/api/retrosMessages';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useRetrosMessages({ query }: { query: string }) {
  return useQuery({
    queryKey: ['retros_messages', query],
    queryFn: () => fetchRetrosMessages({ query }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateRetroMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRetroMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retros_messages'] });
    },
  });
}
