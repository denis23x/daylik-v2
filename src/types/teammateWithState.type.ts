import { Teammate } from './teammate.type';

export type TeammateWithState = Teammate & {
  state: {
    status: 'idle' | 'active' | 'done';
    startedAt: number | null;
    finishedAt: number | null;
  };
};
