import type { Team } from './team';

export type Teammate = {
  UUID: string;
  name: string;
  position: string;
  color: string;
  avatar: string | null;
  userUUID: string;
  teams?: Team[];
  createdAt: string;
};
