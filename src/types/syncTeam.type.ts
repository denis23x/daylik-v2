import type { Team } from './team.type';
import type { Nullable } from './utils/nullable.type';

type SyncFields = {
  startedAt: string;
  finishedAt: string;
};

export type SyncTeam = Team & {
  sync: Nullable<SyncFields> & {
    timer: number;
  };
};
