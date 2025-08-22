import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { Poker } from '@/types/poker.type';

type FetchPokerParams = {
  query: string;
  lte?: string;
  gte?: string;
};

export async function fetchPoker({ query, lte, gte }: FetchPokerParams): Promise<Poker[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('poker')
    .select(query)
    .gte('createdAt', gte || new Date(0).toISOString())
    .lte('createdAt', lte || new Date().toISOString())
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<Poker[]>;
  if (error) throw error;
  return data || [];
}

export async function createPoker(poker: Pick<Poker, 'name'>): Promise<Poker> {
  const { data, error } = await supabase.from('poker').insert(poker).select().single();
  if (error) throw error;
  return data;
}
