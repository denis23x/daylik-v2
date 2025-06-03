import type { AnalyticTeammate } from '@/types/analyticTeammate.type';
import type { TeammateWithState } from '@/types/teammateWithState.type';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';

export async function getTeammatesFromAnalytic({
  UUID,
}: {
  UUID: string;
}): Promise<TeammateWithState[]> {
  // const session = await getSession();
  const { data, error } = await supabase
    .from('analytics_teammates')
    .select('*, teammates (UUID, name, role, color, avatar)')
    .eq('analyticUUID', UUID);
  // .eq('userUUID', session?.user.id);
  if (error) throw error;
  return data;
}

export async function addTeammatesToAnalytic({
  analyticUUID,
  teammates,
}: {
  analyticUUID: string;
  teammates: TeammateWithState[];
}): Promise<AnalyticTeammate[]> {
  const session = await getSession();
  const teammateAnalyticRelations = teammates.map((teammate, index) => ({
    analyticUUID,
    teammateUUID: teammate.UUID,
    order: index, // TODO: order is not used yet
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
