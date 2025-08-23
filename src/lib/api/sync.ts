import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import { Team } from '@/types/team.type';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';

type FetchSyncParams = {
  query: string;
  UUID: string;
};

export async function fetchSync({ query, UUID }: FetchSyncParams): Promise<Team | null> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('teams')
    .select(query)
    .eq('UUID', UUID)
    .eq('userUUID', session?.user.id)
    .single()) as SupabaseQueryResult<Team>;
  if (error) throw error;
  return data;
}
