import type { SyncTeammate } from './syncTeammate.type';
import type { Teammate } from './teammate.type';

type SyncFields = Required<SyncTeammate['sync']>;

export type AnalyticTeammate = SyncFields & {
  UUID: string;
  teammate: Teammate;
};

export type AnalyticTeammateWithRelations = AnalyticTeammate & { teammates: Teammate };
