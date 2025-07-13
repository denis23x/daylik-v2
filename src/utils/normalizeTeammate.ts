import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';

type TeamWithRelations = Team & {
  teams_teammates?: { teammates: Teammate; order: number }[];
};

export function normalizeTeammate(data: TeamWithRelations | null): Team | null {
  if (data) {
    const { teams_teammates, ...teamData } = data;
    const teammates = teams_teammates
      ?.sort((a, b) => a.order - b.order)
      .map((relation) => relation.teammates)
      .flat();

    return { ...teamData, teammates };
  } else {
    return null;
  }
}
