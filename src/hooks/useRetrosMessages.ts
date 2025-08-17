import {
  createRetroMessage,
  fetchRetrosMessages,
  subscribeRetrosMessages,
} from '@/lib/api/retrosMessages';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import type { RetroMessage } from '@/types/retroMessage.type';

export function useRetrosMessages({ query, UUID }: { query: string; UUID: string }) {
  return useQuery({
    queryKey: ['retros_messages', query, UUID],
    queryFn: () => fetchRetrosMessages({ query, UUID }),
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

export function useRetrosMessagesRealtime(UUID: string) {
  const queryClient = useQueryClient();
  const [lastEvent, setLastEvent] = useState<RetroMessage | null>(null);
  const subscriptionRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const event = useCallback((message: RetroMessage) => {
    setLastEvent(message);
  }, []);

  useEffect(() => {
    if (!UUID) return;
    subscribeRetrosMessages(UUID, event).then((s) => (subscriptionRef.current = s));

    return () => {
      if (subscriptionRef.current) {
        supabase.removeChannel(subscriptionRef.current);
        subscriptionRef.current = null;
      }
    };
  }, [UUID, event]);

  useEffect(() => {
    if (lastEvent) {
      // Invalidate the query to get the latest data
      queryClient.invalidateQueries({ queryKey: ['retros_messages'] });
    }
  }, [lastEvent, queryClient]);

  return { event: lastEvent };
}
