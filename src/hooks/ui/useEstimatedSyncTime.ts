import { useCallback } from 'react';
import { getSeconds } from '@/utils/getSeconds';

export function useEstimatedSyncTime() {
  const getEstimatedSyncTime = useCallback((teammates: number, timer: number): number => {
    const t = getSeconds(timer);

    // Timer × Participants + Timer for the host
    return Math.ceil(t * teammates + t);
  }, []);

  return { getEstimatedSyncTime };
}
