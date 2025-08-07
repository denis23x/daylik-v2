import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { RetroMessage } from '@/types/retroMessage.type';

type FetchRetrosMessagesParams = {
  query: string;
};

export async function fetchRetrosMessages({
  query,
}: FetchRetrosMessagesParams): Promise<RetroMessage[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('retros_messages')
    .select(query)
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<RetroMessage[]>;
  if (error) throw error;
  return data || [];
}

export async function createRetroMessage(
  retroMessage: Pick<RetroMessage, 'retroUUID' | 'content'>
): Promise<RetroMessage> {
  const { data, error } = await supabase
    .from('retros_messages')
    .insert(retroMessage)
    .select()
    .single();
  if (error) throw error;
  return data;
}
