import type { Team } from '@/types/team.type';
import { normalizeTeammate } from './normalizeTeammate';

export function normalizeTeammates(data: Team[]): Team[] {
  return data.map((team) => normalizeTeammate(team)).filter((team) => !!team);
}
