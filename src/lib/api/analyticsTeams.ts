import type { AnalyticsTeamWithRelations } from '@/types/analytics.type';
import { supabase } from '@/utils/supabase/client';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';
import { getSession } from '../session';

type GetTeamsFromAnalyticParams = {
  query: string;
  gte: string;
  lte: string;
};

export async function fetchTeamsFromAnalytic({
  query,
  gte,
  lte,
}: GetTeamsFromAnalyticParams): Promise<AnalyticsTeamWithRelations[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('analytics')
    .select(query)
    .gte('createdAt', gte)
    .lte('createdAt', lte)
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<AnalyticsTeamWithRelations[]>;
  if (error) throw error;
  return data || [];
}
