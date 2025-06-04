import type { Teammate } from './teammate.type';

export type AnalyticTeammate = {
  UUID: string;
  order: number;
  startedAt: number;
  finishedAt: number;
  teammate: Teammate;
  teammates?: Teammate;
};
