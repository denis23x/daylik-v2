import type {
  AnalyticsTeammate,
  AnalyticsTeammateWithRelations,
} from '@/types/analyticsTeammate.type';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import { supabase } from '@/utils/supabase/client';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';

type GetTeammatesFromAnalyticParams = {
  query: string;
  UUID: string;
};

type AddTeammatesToAnalyticParams = {
  analyticUUID: string;
  teammates: SyncTeammate[];
};

export async function fetchTeammatesFromAnalytic({
  query,
  UUID,
}: GetTeammatesFromAnalyticParams): Promise<AnalyticsTeammateWithRelations[]> {
  const { data, error } = (await supabase
    .from('analytics_teammates')
    .select(query)
    .eq('analyticUUID', UUID)
    .order('order', { ascending: true })) as SupabaseQueryResult<AnalyticsTeammateWithRelations[]>;
  if (error) throw error;
  return data || [];
}

export async function addTeammatesToAnalytic({
  analyticUUID,
  teammates,
}: AddTeammatesToAnalyticParams): Promise<AnalyticsTeammate[]> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const teammateAnalyticRelations = teammates.map(({ UUID, sync: { status, ...sync } }) => ({
    analyticUUID,
    teammateUUID: UUID,
    ...sync,
  }));
  const { data, error } = await supabase
    .from('analytics_teammates')
    .insert(teammateAnalyticRelations)
    .select();
  if (error) throw error;
  return data;
}
