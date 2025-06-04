import type { AnalyticTeammate } from './analyticTeammate.type';
import type { Teammate } from './teammate.type';
import type { TypedPick } from './utils/typedPick.type';
import type { Nullable } from './utils/nullable.type';

type Sync = Pick<AnalyticTeammate, 'order'> &
  TypedPick<AnalyticTeammate, 'startedAt' | 'finishedAt', string>;

export type TeammateSync = Teammate & {
  sync: Nullable<Sync> & {
    status: 'idle' | 'active' | 'done';
  };
};
