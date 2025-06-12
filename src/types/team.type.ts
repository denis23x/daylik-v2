import type { Teammate } from './teammate.type';

export type Team = {
  UUID: string;
  name: string;
  timer: number;
  userUUID: string;
  teammates?: (Teammate | string)[];
  createdAt: string;
};
