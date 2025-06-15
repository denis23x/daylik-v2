import type { AnalyticTeamWithRelations } from '@/types/analyticTeam.type';
import { supabase } from '@/utils/supabase/client';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import { getSession } from '../session';

type GetTeamsFromAnalyticParams = {
  query: string;
};

export async function fetchTeamsFromAnalytic({
  query,
}: GetTeamsFromAnalyticParams): Promise<AnalyticTeamWithRelations[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('analytics')
    .select(query)
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<AnalyticTeamWithRelations[]>;
  if (error) throw error;
  return data || [];
}
