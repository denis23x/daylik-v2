import { createAnalytics, fetchAnalytics, fetchAnalytics2 } from '@/lib/api/analytics';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useAnalytics({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['analytics', query, UUID],
    queryFn: () => fetchAnalytics({ query, UUID }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useAnalytics2({ query }: { query: string }) {
  return useQuery({
    queryKey: ['analytics', query],
    queryFn: () => fetchAnalytics2({ query }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateAnalytics() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnalytics,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics'] });
    },
  });
}
