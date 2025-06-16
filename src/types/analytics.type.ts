import type { Team } from './team.type';

export type Analytics = {
  UUID: string;
  teamUUID: string;
  userUUID: string;
  startedAt: string;
  finishedAt: string;
  timer: number;
  team?: Team;
  createdAt: string;
};

export type AnalyticsTeamWithRelations = Analytics & { teams: Team };
