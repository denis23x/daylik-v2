import type { Analytics } from '@/types/analytics.type';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';

type FetchAnalyticsParams = {
  query: string;
  UUID: string;
};

export async function fetchAnalytics({
  query,
  UUID,
}: FetchAnalyticsParams): Promise<Analytics | null> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('analytics')
    .select(query)
    .eq('UUID', UUID)
    .eq('userUUID', session?.user.id)
    .order('createdAt', { ascending: false })
    .single()) as SupabaseQueryResult<Analytics>;
  if (error) throw error;
  return data;
}

export async function createAnalytics(
  analytics: Pick<Analytics, 'teamUUID' | 'timer' | 'startedAt' | 'finishedAt'>
): Promise<Analytics> {
  const { data, error } = await supabase.from('analytics').insert(analytics).select().single();
  if (error) throw error;
  return data;
}
