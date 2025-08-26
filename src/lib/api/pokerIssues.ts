import { supabase } from '@/utils/supabase/client';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { PokerIssue } from '@/types/pokerIssues.type';

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
    .eq('pokerUUID', pokerUUID)) as SupabaseQueryResult<PokerIssue[]>;
  if (error) throw error;
  return data || [];
}
