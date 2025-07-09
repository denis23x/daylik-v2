import { useMutation } from '@tanstack/react-query';
import { sendFeedback } from '@/lib/api/feedback';

export function useSendFeedback() {
  return useMutation({
    mutationFn: sendFeedback,
  });
}
