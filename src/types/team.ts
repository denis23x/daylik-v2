import type { Teammate } from './teammate';

export type Team = {
  UUID: string;
  name: string;
  userUUID: string;
  createdAt: string;
  teammates?: Teammate[];
};
