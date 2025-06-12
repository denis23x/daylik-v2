import type { SyncTeammate } from '@/types/syncTeammate.type';

export function getIsLastActive(syncTeammates: SyncTeammate[]): boolean {
  let activeCount = 0;

  for (const syncTeammate of syncTeammates) {
    if (syncTeammate.sync.status === 'active') {
      activeCount++;
    } else if (syncTeammate.sync.status !== 'done') {
      return false;
    }
  }

  return activeCount === 1;
}
