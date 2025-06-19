import { addTeammatesToAnalytic, fetchTeammatesFromAnalytic } from '@/lib/api/analyticsTeammates';
import { normalizeAnalyticsTeammates } from '@/utils/normalizeAnalyticsTeammates';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTeammatesFromAnalytic({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['analytics', query, UUID],
    queryFn: () => fetchTeammatesFromAnalytic({ query, UUID }),
    staleTime: 1000 * 60 * 5,
    select: (data) => normalizeAnalyticsTeammates(data),
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
