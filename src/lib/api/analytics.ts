import type { Analytic } from '@/types/analytic.type';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';

type SupabaseQueryResult<T> = {
  data: T | null;
  error: Error | null;
};

export async function fetchAnalytics(query: string = '*', UUID: string): Promise<Analytic[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('analytics')
    .select(query)
    .eq('UUID', UUID)
    .eq('userUUID', session?.user.id)
    .order('createdAt', { ascending: false })) as SupabaseQueryResult<Analytic[]>;
  if (error) throw error;
  return data || [];
}

export async function createAnalytics(
  analytics: Pick<Analytic, 'teamUUID' | 'timer' | 'startedAt' | 'finishedAt'>
): Promise<Analytic> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('analytics')
    .insert(analytics)
    .eq('userUUID', session?.user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
