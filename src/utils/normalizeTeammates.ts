import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';

export function normalizeTeammates(data: Team | Team[] | null): Team | Team[] | null {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map((team) => normalizeTeammates(team) as Team);
  }

  // Single team
  const { teams_teammates, ...team } = data as {
    teams_teammates?: { teammates: Teammate }[];
  } & Team;

  const teammates = teams_teammates?.map((relation) => relation.teammates).flat();

  return { ...team, teammates };
}
