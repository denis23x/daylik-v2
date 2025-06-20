import type { Teammate } from '@/types/teammate.type';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';

type FetchTeammatesParams = {
  query: string;
};

export async function fetchTeammates({ query }: FetchTeammatesParams): Promise<Teammate[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('teammates')
    .select(query)
    .eq('userUUID', session?.user.id)
    .order('createdAt', { ascending: false })) as SupabaseQueryResult<Teammate[]>;
  if (error) throw error;
  return data || [];
}

export async function createTeammate(
  teammate: Pick<Teammate, 'name' | 'role' | 'color' | 'avatar'>
): Promise<Teammate> {
  const { data, error } = await supabase.from('teammates').insert(teammate).select().single();
  if (error) throw error;
  return data;
}

export async function updateTeammate(
  teammate: Pick<Teammate, 'UUID'> & Partial<Pick<Teammate, 'name' | 'role' | 'color' | 'avatar'>>
): Promise<Teammate> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('teammates')
    .update(teammate)
    .eq('UUID', teammate.UUID)
    .eq('userUUID', session?.user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTeammate(UUID: string): Promise<Teammate[]> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('teammates')
    .delete()
    .eq('UUID', UUID)
    .eq('userUUID', session?.user.id)
    .select();
  if (error) throw error;
  return data;
}
