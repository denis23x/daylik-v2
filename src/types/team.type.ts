import type { Teammate } from './teammate.type';

export type Team = {
  UUID: string;
  name: string;
  timer: number;
  image: string | null;
  userUUID: string;
  teammates?: (Teammate | string)[];
  createdAt: string;
};
