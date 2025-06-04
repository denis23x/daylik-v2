import { addTeammatesToAnalytic, fetchTeammatesFromAnalytic } from '@/lib/api/analyticsTeammates';
import type { AnalyticTeammate } from '@/types/analyticTeammate.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useTeammatesFromAnalytic({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['analytics_teammates', query, UUID],
    queryFn: () => fetchTeammatesFromAnalytic({ query, UUID }),
    staleTime: 1000 * 60 * 5,
    select: (data) => {
      return data.map((analytic: AnalyticTeammate) => ({
        UUID: analytic.UUID,
        order: analytic.order,
        startedAt: new Date(analytic.startedAt).toISOString(),
        finishedAt: new Date(analytic.finishedAt).toISOString(),
        teammate: analytic.teammates,
      }));
    },
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
