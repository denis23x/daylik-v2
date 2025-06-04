import type { Team } from '@/types/team.type';
import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';

type FetchTeamsParams = {
  query: string;
};

export async function fetchTeams({ query }: FetchTeamsParams): Promise<Team[]> {
  const session = await getSession();
  const { data, error } = (await supabase
    .from('teams')
    .select(query)
    .eq('userUUID', session?.user.id)
    .order('createdAt', { ascending: false })) as SupabaseQueryResult<Team[]>;
  if (error) throw error;
  return data || [];
}

export async function createTeam(team: Pick<Team, 'name'>): Promise<Team> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('teams')
    .insert(team)
    .eq('userUUID', session?.user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTeam(team: Pick<Team, 'UUID' | 'name'>): Promise<Team> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('teams')
    .update(team)
    .eq('UUID', team.UUID)
    .eq('userUUID', session?.user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTeam(UUID: string): Promise<Team[]> {
  const session = await getSession();
  const { data, error } = await supabase
    .from('teams')
    .delete()
    .eq('UUID', UUID)
    .eq('userUUID', session?.user.id)
    .select();
  if (error) throw error;
  return data;
}
