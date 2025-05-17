import { supabase } from '@/utils/supabase/client';
import { getSession } from '../session';
import type { TeamTeammate } from '@/types/teamTeammate.type';

interface AddTeammatesToTeam {
  teamUUID: string;
  teammates: string[];
}

interface RemoveTeammatesFromTeam extends AddTeammatesToTeam {
  teammatesDisableInvalidateQueries?: boolean;
}

interface AddTeamsToTeammate {
  teammateUUID: string;
  teams: string[];
}

interface RemoveTeamsFromTeammate extends AddTeamsToTeammate {
  teamsDisableInvalidateQueries?: boolean;
}

export async function addTeammatesToTeam({
  teamUUID,
  teammates,
}: AddTeammatesToTeam): Promise<TeamTeammate[]> {
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
  if (error) throw new Error(error.message);
  return data;
}

export async function removeTeammatesFromTeam({
  teamUUID,
  teammates,
}: RemoveTeammatesFromTeam): Promise<TeamTeammate[]> {
  const { data, error } = await supabase
    .from('teams_teammates')
    .delete()
    .in('teammateUUID', teammates)
    .eq('teamUUID', teamUUID)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function addTeamsToTeammate({
  teammateUUID,
  teams,
}: AddTeamsToTeammate): Promise<TeamTeammate[]> {
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
  if (error) throw new Error(error.message);
  return data;
}

export async function removeTeamsFromTeammate({
  teammateUUID,
  teams,
}: RemoveTeamsFromTeammate): Promise<TeamTeammate[]> {
  const { data, error } = await supabase
    .from('teams_teammates')
    .delete()
    .in('teamUUID', teams)
    .eq('teammateUUID', teammateUUID)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
