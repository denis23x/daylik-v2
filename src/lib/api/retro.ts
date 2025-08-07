import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { Retro } from '@/types/retro.type';

type FetchRetroParams = {
  query: string;
  lte: string;
  gte: string;
};

export async function fetchRetro({ query, lte, gte }: FetchRetroParams): Promise<Retro[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('retros')
    .select(query)
    .gte('createdAt', gte)
    .lte('createdAt', lte)
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<Retro[]>;
  if (error) throw error;
  return data || [];
}
