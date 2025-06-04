import { Teammate } from './teammate.type';

export type TeammateWithState = Teammate & {
  state: {
    order: number | null;
    status: 'idle' | 'active' | 'done';
    startedAt: string | null;
    finishedAt: string | null;
  };
};
