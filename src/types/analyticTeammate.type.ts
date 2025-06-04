import type { Teammate } from './teammate.type';

export type AnalyticTeammate = {
  UUID: string;
  analyticUUID: string;
  teammateUUID: string;
  order: number;
  startedAt: string;
  finishedAt: string;
  teammates: Teammate;
};
