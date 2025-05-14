import type { Team } from '@/types/team.type';
import { supabase } from '@/utils/supabase/client';

export async function fetchTeams(): Promise<Team[]> {
  const { data, error } = await supabase.from('teams').select();
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createTeam(team: Omit<Team, 'UUID'>): Promise<Team> {
  const { data, error } = await supabase.from('teams').insert(team).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTeam(team: Team): Promise<Team> {
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
