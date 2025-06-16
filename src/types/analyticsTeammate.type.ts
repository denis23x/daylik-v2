import type { Teammate } from './teammate.type';

export type AnalyticsTeammate = {
  UUID: string;
  analyticUUID: string;
  teammateUUID: string;
  order: number;
  total: number;
  paused: number;
  overtime: number;
  teammate?: Teammate;
};

export type AnalyticsTeammateWithRelations = AnalyticsTeammate & { teammates: Teammate };
