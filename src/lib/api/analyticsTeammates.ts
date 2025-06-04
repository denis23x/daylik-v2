import type { AnalyticTeammate } from '@/types/analyticTeammate.type';
import type { TeammateWithState } from '@/types/teammateWithState.type';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/supabaseQueryResult.type';

type GetTeammatesFromAnalyticParams = {
  query: string;
  UUID: string;
};

type AddTeammatesToAnalyticParams = {
  analyticUUID: string;
  teammates: TeammateWithState[];
};

export async function fetchTeammatesFromAnalytic({
  query,
  UUID,
}: GetTeammatesFromAnalyticParams): Promise<TeammateWithState[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('analytics_teammates')
    .select(query)
    .eq('analyticUUID', UUID)
    .eq('userUUID', session?.user.id)
    .order('order', { ascending: false })) as SupabaseQueryResult<TeammateWithState[]>;
  if (error) throw error;
  return data || [];
}

export async function addTeammatesToAnalytic({
  analyticUUID,
  teammates,
}: AddTeammatesToAnalyticParams): Promise<AnalyticTeammate[]> {
  const session = await getSession();
  const teammateAnalyticRelations = teammates.map((teammate) => ({
    analyticUUID,
    teammateUUID: teammate.UUID,
    order: teammate.state.order,
    startedAt: teammate.state.startedAt,
    finishedAt: teammate.state.finishedAt,
  }));
  const { data, error } = await supabase
    .from('analytics_teammates')
    .insert(teammateAnalyticRelations)
    .eq('userUUID', session?.user.id)
    .select();
  if (error) throw error;
  return data;
}
