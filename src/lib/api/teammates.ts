import type { Teammate } from '@/types/teammate';
import { supabase } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

export async function fetchTeammates(user: User): Promise<Teammate[]> {
  const { data, error } = await supabase
    .from('teammates')
    .select(
      `
          *,
          teams_teammates (
            teams (
              UUID,
              name
            )
          )
        `
    )
    .eq('userUUID', user.id);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createTeammate(
  teammate: Omit<Teammate, 'UUID' | 'createdAt'>
): Promise<Teammate> {
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
