import type { Teammate } from '@/types/teammate.type';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';

type SupabaseQueryResult<T> = {
  data: T | null;
  error: Error | null;
};

export async function fetchTeammates(query: string = '*'): Promise<Teammate[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('teammates')
    .select(query)
    .eq('userUUID', session?.user.id)
    .order('createdAt', { ascending: false })) as SupabaseQueryResult<Teammate[]>;
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createTeammate(
  teammate: Pick<Teammate, 'name' | 'position' | 'color' | 'avatar'>
): Promise<Teammate> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('teammates')
    .insert(teammate)
    .eq('userUUID', session?.user.id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTeammate(
  teammate: Omit<Teammate, 'userUUID' | 'createdAt'>
): Promise<Teammate> {
  const { data, error } = await supabase
    .from('teammates')
    .update(teammate)
    .eq('UUID', teammate.UUID)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTeammate(UUID: string): Promise<Teammate[]> {
  const { data, error } = await supabase.from('teammates').delete().eq('UUID', UUID).select();
  if (error) throw new Error(error.message);
  return data;
}
