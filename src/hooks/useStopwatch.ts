import { useCallback, useEffect, useRef } from 'react';

type TimerStatus = 'idle' | 'running' | 'finished';

interface StopwatchOptions {
  onStart?: () => void;
  onFinish?: () => void;
}

export const useStopwatch = ({ onStart, onFinish }: StopwatchOptions = {}) => {
  const statusRef = useRef<TimerStatus>('idle');
  const startTimestampRef = useRef<number | null>(null);

  const getNow = () => performance.now();

  const clearStopwatch = () => {
    startTimestampRef.current = null;
    statusRef.current = 'idle';
  };

  const getElapsedMS = useCallback(() => {
    if (!startTimestampRef.current) return 0;
    return getNow() - startTimestampRef.current;
  }, []);

  const start = useCallback(() => {
    if (statusRef.current !== 'idle') return;

    startTimestampRef.current = getNow();
    statusRef.current = 'running';
    onStart?.();
  }, [onStart]);

  const stop = useCallback(() => {
    if (statusRef.current !== 'running') return;

    statusRef.current = 'finished';
    onFinish?.();
  }, [onFinish]);

  useEffect(() => clearStopwatch, []);

  return {
    start,
    stop,
    getElapsedMS,
    isIdle: (() => statusRef.current === 'idle')(),
    isRunning: (() => statusRef.current === 'running')(),
    isFinished: (() => statusRef.current === 'finished')(),
  };
};
