import { Teammate } from './teammate.type';

export type TeammateWithState = Teammate & {
  state: {
    status: 'idle' | 'active' | 'done';
    startedAt: string | null;
    finishedAt: string | null;
  };
};
