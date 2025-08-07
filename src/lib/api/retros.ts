import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import type { Retro } from '@/types/retro.type';

type FetchRetrosParams = {
  query: string;
  lte?: string;
  gte?: string;
};

export async function fetchRetros({ query, lte, gte }: FetchRetrosParams): Promise<Retro[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('retros')
    .select(query)
    .gte('createdAt', gte || new Date(0).toISOString())
    .lte('createdAt', lte || new Date().toISOString())
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<Retro[]>;
  if (error) throw error;
  return data || [];
}
