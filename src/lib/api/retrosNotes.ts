import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { RetroNote } from '@/types/retroNote.type';

type FetchRetrosNotesParams = {
  query: string;
};

export async function fetchRetrosNotes({ query }: FetchRetrosNotesParams): Promise<RetroNote[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('retros_notes')
    .select(query)
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<RetroNote[]>;
  if (error) throw error;
  return data || [];
}

export async function createRetroNote(
  retroNote: Pick<RetroNote, 'retroUUID' | 'output'>
): Promise<RetroNote> {
  const { data, error } = await supabase.from('retros_notes').insert(retroNote).select().single();
  if (error) throw error;
  return data;
}
