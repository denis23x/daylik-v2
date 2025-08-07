import { createRetroNote, fetchRetrosNotes } from '@/lib/api/retrosNotes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useRetrosNotes({ query }: { query: string }) {
  return useQuery({
    queryKey: ['retros_notes', query],
    queryFn: () => fetchRetrosNotes({ query }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateRetroNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRetroNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retros_notes'] });
    },
  });
}
