import type { Teammate } from './teammate';

export type Team = {
  UUID: string;
  name: string;
  userUUID: string;
  createdAt: string;
  teammates: Teammate[];

  // Relation to teams_teammates
  teams_teammates?: {
    teammates: Teammate[];
  }[];
};
