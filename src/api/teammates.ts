import type { Teammate } from '@/types/teammate';
import { supabase } from '@/utils/supabase/client';

export async function fetchTeammates(): Promise<Teammate[]> {
  const { data, error } = await supabase.from('teammates').select();
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createTeammate(teammate: Omit<Teammate, 'UUID'>): Promise<Teammate> {
  const { data, error } = await supabase.from('teammates').insert(teammate).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTeammate(teammate: Teammate): Promise<Teammate> {
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
