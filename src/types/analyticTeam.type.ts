import type { SyncTeam } from './syncTeam.type';
import type { Team } from './team.type';

type SyncFields = Required<SyncTeam>;

export type AnalyticTeam = SyncFields & {
  UUID: string;
  team: Team;
  createdAt: string;
  startedAt: string;
  finishedAt: string;
};

export type AnalyticTeamWithRelations = AnalyticTeam & { teams: Team };
