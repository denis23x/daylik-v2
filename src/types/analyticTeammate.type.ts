import type { Teammate } from './teammate.type';

export type AnalyticTeammate = {
  UUID: string;
  order: number;
  elapsed: number;
  overtime: number;
  startedAt: number;
  finishedAt: number;
  teammate: Teammate;
};
