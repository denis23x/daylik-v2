import type { Analytic } from '@/types/analytic.type';
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
}: FetchAnalyticsParams): Promise<Analytic | null> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('analytics')
    .select(query)
    .eq('UUID', UUID)
    .eq('userUUID', session?.user.id)
    .order('createdAt', { ascending: false })
    .single()) as SupabaseQueryResult<Analytic>;
  if (error) throw error;
  return data;
}

export async function fetchAnalytics2({ query }: { query: string }): Promise<Analytic[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('analytics')
    .select(query)
    .eq('userUUID', session?.user.id)) as SupabaseQueryResult<Analytic[]>;
  if (error) throw error;
  return data || [];
}

export async function createAnalytics(
  analytics: Pick<Analytic, 'teamUUID' | 'timer' | 'startedAt' | 'finishedAt'>
): Promise<Analytic> {
  const { data, error } = await supabase.from('analytics').insert(analytics).select().single();
  if (error) throw error;
  return data;
}
