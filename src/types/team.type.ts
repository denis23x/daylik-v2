import type { Teammate } from './teammate.type';

export type Team = {
  UUID: string;
  name: string;
  userUUID: string;
  teammates?: (Teammate | string)[];
  createdAt: string;
};
