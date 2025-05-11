import type { Teammate } from './teammate';

export type Team = {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
  teammate: Teammate[];
};
