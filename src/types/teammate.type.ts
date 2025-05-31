import type { Team } from './team.type';

export type Teammate = {
  UUID: string;
  name: string;
  role: string;
  color: string;
  avatar: string | null;
  userUUID: string;
  teams?: (Team | string)[];
  createdAt: string;
};
