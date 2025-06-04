import type { NullablePick } from './nullablePick.type';
import type { AnalyticTeammate } from './analyticTeammate.type';
import type { Teammate } from './teammate.type';

export type TeammateSync = Teammate & {
  sync: NullablePick<AnalyticTeammate, 'order' | 'startedAt' | 'finishedAt'> & {
    status: 'idle' | 'active' | 'done';
  };
};
