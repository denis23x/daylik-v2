import type { AnalyticTeammate } from '@/types/analyticTeammate.type';
import type { TeammateSync } from '@/types/teammateSync.type';
import { supabase } from '@/utils/supabase/client';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';

type GetTeammatesFromAnalyticParams = {
  query: string;
  UUID: string;
};

type AddTeammatesToAnalyticParams = {
  analyticUUID: string;
  teammates: TeammateSync[];
};

export async function fetchTeammatesFromAnalytic({
  query,
  UUID,
}: GetTeammatesFromAnalyticParams): Promise<AnalyticTeammate[]> {
  const { data, error } = (await supabase
    .from('analytics_teammates')
    .select(query)
    .eq('analyticUUID', UUID)) as SupabaseQueryResult<AnalyticTeammate[]>;
  if (error) throw error;
  return data || [];
}

export async function addTeammatesToAnalytic({
  analyticUUID,
  teammates,
}: AddTeammatesToAnalyticParams): Promise<AnalyticTeammate[]> {
  const teammateAnalyticRelations = teammates.map((teammate) => ({
    analyticUUID,
    teammateUUID: teammate.UUID,
    order: teammate.sync.order,
    startedAt: teammate.sync.startedAt,
    finishedAt: teammate.sync.finishedAt,
  }));
  const { data, error } = await supabase
    .from('analytics_teammates')
    .insert(teammateAnalyticRelations)
    .select();
  if (error) throw error;
  return data;
}
