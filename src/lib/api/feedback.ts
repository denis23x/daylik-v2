import { supabase } from '@/utils/supabase/client';

type SendFeedbackParams = {
  message: string;
  priority: 'low' | 'medium' | 'high';
};

export async function sendFeedback({ message, priority }: SendFeedbackParams) {
  const { data, error } = await supabase.functions.invoke('send-feedback', {
    method: 'POST',
    body: {
      message,
      priority,
    },
  });
  if (error) throw error;
  return data;
}
