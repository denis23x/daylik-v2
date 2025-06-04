import { addTeammatesToAnalytic, fetchTeammatesFromAnalytic } from '@/lib/api/analyticsTeammates';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTeammatesFromAnalytic({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['analytics_teammates', query, UUID],
    queryFn: () => fetchTeammatesFromAnalytic({ query, UUID }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddTeammatesToAnalytic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTeammatesToAnalytic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}
