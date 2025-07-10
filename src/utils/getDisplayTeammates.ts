import type { Team } from '@/types/team.type';
import { v4 as uuidv4 } from 'uuid';

export function getDisplayTeammates(team: Team, count = 4) {
  if (team.teammates && team.teammates.length < count) {
    const mockTeammates = Array.from({ length: count }, () => ({
      UUID: uuidv4(),
    }));

    return [...(team.teammates || []), ...mockTeammates].slice(0, count);
  }

  return team.teammates || [];
}
