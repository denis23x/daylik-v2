import { supabase } from '@/utils/supabase/client';
import type { TeamTeammate } from '@/types/teamTeammate.type';
import { SupabaseQueryResult } from '@/types/utils/supabaseQueryResult.type';

type FetchTeammatesToTeamParams = {
  query: string;
  UUID: string;
};

type AddTeammatesToTeamParams = {
  teamUUID: string;
  teammates: string[];
};

type RemoveTeammatesFromTeamParams = AddTeammatesToTeamParams & {
  teammatesDisableInvalidateQueries?: boolean;
};

type FetchTeamsToTeammateParams = {
  query: string;
  UUID: string;
};

type AddTeamsToTeammateParams = {
  teammateUUID: string;
  teams: string[];
};

type RemoveTeamsFromTeammateParams = AddTeamsToTeammateParams & {
  teamsDisableInvalidateQueries?: boolean;
};

export async function fetchTeammatesFromTeam({
  query,
  UUID,
}: FetchTeammatesToTeamParams): Promise<TeamTeammate[]> {
  const { data, error } = (await supabase
    .from('teams_teammates')
    .select(query)
    .eq('teamUUID', UUID)) as SupabaseQueryResult<TeamTeammate[]>;
  if (error) throw error;
  return data || [];
}

export async function addTeammatesToTeam({
  teamUUID,
  teammates,
}: AddTeammatesToTeamParams): Promise<TeamTeammate[]> {
  const teammateTeamRelations = teammates.map((teammateUUID) => ({
    teamUUID,
    teammateUUID,
  }));
  const { data, error } = await supabase
    .from('teams_teammates')
    .insert(teammateTeamRelations)
    .select();
  if (error) throw error;
  return data;
}

export async function removeTeammatesFromTeam({
  teamUUID,
  teammates,
}: RemoveTeammatesFromTeamParams): Promise<TeamTeammate[]> {
  const { data, error } = await supabase
    .from('teams_teammates')
    .delete()
    .in('teammateUUID', teammates)
    .eq('teamUUID', teamUUID)
    .select();
  if (error) throw error;
  return data;
}

export async function fetchTeamsToTeammate({
  query,
  UUID,
}: FetchTeamsToTeammateParams): Promise<TeamTeammate[]> {
  const { data, error } = (await supabase
    .from('teams_teammates')
    .select(query)
    .eq('teammateUUID', UUID)) as SupabaseQueryResult<TeamTeammate[]>;
  if (error) throw error;
  return data || [];
}

export async function addTeamsToTeammate({
  teammateUUID,
  teams,
}: AddTeamsToTeammateParams): Promise<TeamTeammate[]> {
  const teammateTeamRelations = teams.map((teamUUID) => ({
    teamUUID,
    teammateUUID,
  }));
  const { data, error } = await supabase
    .from('teams_teammates')
    .insert(teammateTeamRelations)
    .select();
  if (error) throw error;
  return data;
}

export async function removeTeamsFromTeammate({
  teammateUUID,
  teams,
}: RemoveTeamsFromTeammateParams): Promise<TeamTeammate[]> {
  const { data, error } = await supabase
    .from('teams_teammates')
    .delete()
    .in('teamUUID', teams)
    .eq('teammateUUID', teammateUUID)
    .select();
  if (error) throw error;
  return data;
}
