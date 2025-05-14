import type { Teammate } from './teammate';

export type Team = {
  UUID: string;
  name: string;
  userUUID: string;
  teammates?: Teammate[];
  createdAt: string;

  // Relation to teams_teammates
  teams_teammates?: {
    teammates: Teammate[];
  }[];
};
