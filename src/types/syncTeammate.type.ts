import type { Teammate } from './teammate.type';
import type { Nullable } from './utils/nullable.type';

type SyncFields = {
  order: number;
  elapsed: number;
  overtime: number;
  total: number;
  paused: number;
};

export type SyncTeammate = Teammate & {
  sync: Nullable<SyncFields> & {
    status: 'idle' | 'active' | 'done';
  };
};
