type SyncFields = {
  startedAt: string;
  finishedAt: string;
  timer: number;
};

export type Analytic = SyncFields & {
  UUID: string;
  teamUUID: string;
  userUUID: string;
  createdAt: string;
};
