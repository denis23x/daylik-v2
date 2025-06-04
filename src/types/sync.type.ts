export type Sync = {
  status: 'idle' | 'active' | 'done';
  order: number | null;
  startedAt: string | null;
  finishedAt: string | null;
};
