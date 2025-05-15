import type { Team } from '@/types/team.type';
import { supabase } from '@/utils/supabase/client';
import type { User } from '@supabase/supabase-js';

export async function fetchTeams(user: User): Promise<Team[]> {
  const { data, error } = await supabase.from('teams').select().eq('userUUID', user.id);
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createTeam(team: Omit<Team, 'UUID' | 'createdAt'>): Promise<Team> {
  const { data, error } = await supabase.from('teams').insert(team).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTeam(team: Omit<Team, 'userUUID' | 'createdAt'>): Promise<Team> {
  const { data, error } = await supabase
    .from('teams')
    .update(team)
    .eq('UUID', team.UUID)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteTeam(UUID: string): Promise<Team[]> {
  const { data, error } = await supabase.from('teams').delete().eq('UUID', UUID).select();
  if (error) throw new Error(error.message);
  return data;
}
