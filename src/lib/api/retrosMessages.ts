import { supabase } from '@/utils/supabase/client';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { RetroMessage } from '@/types/retroMessage.type';
import type { NullablePick } from '@/types/utils/nullablePick.type';

type FetchRetrosMessagesParams = {
  query: string;
  UUID: string;
};

export async function fetchRetrosMessages({
  query,
  UUID,
}: FetchRetrosMessagesParams): Promise<RetroMessage[]> {
  const { data, error } = (await supabase
    .from('retros_messages')
    .select(query)
    .order('createdAt', { ascending: false })
    .eq('retroUUID', UUID)) as SupabaseQueryResult<RetroMessage[]>;
  if (error) throw error;
  return data || [];
}

export async function createRetroMessage(
  retroMessage: Pick<RetroMessage, 'retroUUID' | 'description'> & NullablePick<RetroMessage, 'name'>
): Promise<void> {
  const { data, error } = await supabase.from('retros_messages').insert(retroMessage).single();
  if (error) throw error;
  return data;
}

export async function subscribeRetrosMessages(
  UUID: string,
  cb: (message: RetroMessage) => void
): Promise<ReturnType<typeof supabase.channel>> {
  return supabase
    .channel(`retros-messages-uuid-${UUID}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'retros_messages',
        filter: `retroUUID=eq.${UUID}`,
      },
      (message) => cb(message.new as RetroMessage)
    )
    .subscribe();
}
