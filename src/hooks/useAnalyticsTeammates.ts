import { addTeammatesToAnalytic, getTeammatesFromAnalytic } from '@/lib/api/analytics_teammates';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetTeammatesFromAnalytic({ UUID }: { UUID: string }) {
  return useQuery({
    queryKey: ['analytics_teammates', UUID],
    queryFn: () => getTeammatesFromAnalytic({ UUID }),
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
