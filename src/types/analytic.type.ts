import type { SyncTeam } from './syncTeam.type';

type SyncFields = Required<SyncTeam['sync']>;

export type Analytic = SyncFields & {
  UUID: string;
  teamUUID: string;
  userUUID: string;
};
