import { supabase } from '@/utils/supabase/client';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { PokerIssue } from '@/types/pokerIssues.type';
import { getSession } from '../session';

type FetchPokerIssuesParams = {
  query: string;
  pokerUUID: string;
};

export async function fetchPokerIssues({
  query,
  pokerUUID,
}: FetchPokerIssuesParams): Promise<PokerIssue[]> {
  const { data, error } = (await supabase
    .from('poker_issues')
    .select(query)
    .eq('pokerUUID', pokerUUID)
    .order('createdAt', { ascending: false })) as SupabaseQueryResult<PokerIssue[]>;
  if (error) throw error;
  return data || [];
}

export async function createPokerIssue(pokerIssue: Omit<PokerIssue, 'UUID'>): Promise<PokerIssue> {
  const { data, error } = await supabase.from('poker_issues').insert(pokerIssue).select().single();
  if (error) throw error;
  return data;
}

export async function updatePokerIssue(
  pokerIssue: Pick<PokerIssue, 'UUID'> & Partial<PokerIssue>
): Promise<PokerIssue> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('poker_issues')
    .update(pokerIssue)
    .eq('UUID', pokerIssue.UUID)
    .eq('userUUID', session?.user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePokerIssue(UUID: string): Promise<PokerIssue[]> {
  const { data, error } = await supabase.from('poker_issues').delete().eq('UUID', UUID).select();
  if (error) throw error;
  return data;
}
