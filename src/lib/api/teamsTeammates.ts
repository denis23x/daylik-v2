import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { TeamTeammate } from '@/types/teamTeammate.type';

interface AddTeammatesToTeamParams {
  teamUUID: string;
  teammates: string[];
}

interface RemoveTeammatesFromTeamParams extends AddTeammatesToTeamParams {
  teammatesDisableInvalidateQueries?: boolean;
}

interface AddTeamsToTeammateParams {
  teammateUUID: string;
  teams: string[];
}

interface RemoveTeamsFromTeammateParams extends AddTeamsToTeammateParams {
  teamsDisableInvalidateQueries?: boolean;
}

export async function addTeammatesToTeam({
  teamUUID,
  teammates,
}: AddTeammatesToTeamParams): Promise<TeamTeammate[]> {
  const session = await getSession();
  const teammateTeamRelations = teammates.map((teammateUUID) => ({
    teamUUID,
    teammateUUID,
  }));
  const { data, error } = await supabase
    .from('teams_teammates')
    .insert(teammateTeamRelations)
    .eq('userUUID', session?.user.id)
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

export async function addTeamsToTeammate({
  teammateUUID,
  teams,
}: AddTeamsToTeammateParams): Promise<TeamTeammate[]> {
  const session = await getSession();
  const teammateTeamRelations = teams.map((teamUUID) => ({
    teamUUID,
    teammateUUID,
  }));
  const { data, error } = await supabase
    .from('teams_teammates')
    .insert(teammateTeamRelations)
    .eq('userUUID', session?.user.id)
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
