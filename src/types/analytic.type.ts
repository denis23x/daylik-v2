import type { Sync } from './sync.type';

type SyncFields = Required<Sync['sync']>;

export type Analytic = SyncFields & {
  UUID: string;
  teamUUID: string;
  userUUID: string;
};
