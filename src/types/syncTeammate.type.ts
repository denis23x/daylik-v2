import type { Teammate } from './teammate.type';
import type { Nullable } from './utils/nullable.type';

type SyncFields = {
  order: number;
  elapsed: number;
  overtime: number;
  startedAt: string;
  finishedAt: string;
};

export type SyncTeammate = Teammate & {
  sync: Nullable<SyncFields> & {
    status: 'idle' | 'active' | 'done';
  };
};
