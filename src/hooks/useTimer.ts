import { useCallback, useEffect, useRef } from 'react';

type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

interface TimerOptions {
  duration: number; // in milliseconds
  onStart?: () => void;
  onFinish?: () => void;
}

export const useTimer = ({ duration, onStart, onFinish }: TimerOptions) => {
  const statusRef = useRef<TimerStatus>('idle');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimestampRef = useRef<number | null>(null);
  const pauseStartRef = useRef<number | null>(null);
  const totalPausedMSRef = useRef<number>(0);

  const getNow = () => performance.now();

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  /**
   * Calculates the elapsed time in milliseconds since the timer started.
   * If the timer is paused, uses the pause timestamp instead of current time.
   * Returns 0 if timer hasn't started, or the minimum between elapsed time and total duration.
   * @returns {number} Elapsed time in milliseconds
   */
  const getElapsedMS = useCallback(() => {
    if (!startTimestampRef.current) return 0;

    const now =
      statusRef.current === 'paused' && pauseStartRef.current ? pauseStartRef.current : getNow();

    return Math.min(duration, now - startTimestampRef.current - totalPausedMSRef.current);
  }, [duration]);

  /**
   * Calculates the total time the timer has been paused.
   * If currently paused, includes the current pause duration.
   * @returns {number} Total paused time in milliseconds
   */
  const getPausedMS = useCallback(() => {
    if (statusRef.current !== 'paused' || !pauseStartRef.current) return totalPausedMSRef.current;
    return totalPausedMSRef.current + (getNow() - pauseStartRef.current);
  }, []);

  /**
   * Calculates the total time that has passed since the timer started,
   * including both elapsed and paused time.
   * Returns 0 if timer hasn't started.
   * @returns {number} Total time in milliseconds
   */
  const getTotalMS = useCallback(() => {
    if (!startTimestampRef.current) return 0;
    return Math.min(getPausedMS() + getElapsedMS(), getNow() - startTimestampRef.current);
  }, [getElapsedMS, getPausedMS]);

  /**
   * Calculates the remaining time until the timer finishes.
   * Returns 0 if the timer has finished or if the remaining time would be negative.
   * @returns {number} Remaining time in milliseconds
   */
  const getRemainingMS = useCallback(() => {
    return Math.max(0, duration - getElapsedMS());
  }, [duration, getElapsedMS]);

  const start = useCallback(() => {
    if (statusRef.current !== 'idle') return;

    const now = getNow();
    startTimestampRef.current = now;
    pauseStartRef.current = null;
    totalPausedMSRef.current = 0;
    statusRef.current = 'running';

    onStart?.();

    timeoutRef.current = setTimeout(() => {
      statusRef.current = 'finished';
      onFinish?.();
    }, duration);
  }, [duration, onStart, onFinish]);

  const pause = useCallback(() => {
    if (statusRef.current !== 'running') return;

    clearTimer();
    pauseStartRef.current = getNow();
    statusRef.current = 'paused';
  }, []);

  const resume = useCallback(() => {
    if (statusRef.current !== 'paused' || !pauseStartRef.current) return;

    const now = getNow();
    const pausedDuration = now - pauseStartRef.current;
    totalPausedMSRef.current += pausedDuration;
    pauseStartRef.current = null;

    const remaining = duration - getElapsedMS();
    if (remaining <= 0) {
      statusRef.current = 'finished';
      onFinish?.();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      statusRef.current = 'finished';
      onFinish?.();
    }, remaining);

    statusRef.current = 'running';
  }, [duration, getElapsedMS, onFinish]);

  const stop = useCallback(() => {
    clearTimer();
    startTimestampRef.current = null;
    pauseStartRef.current = null;
    totalPausedMSRef.current = 0;
    statusRef.current = 'idle';
  }, []);

  useEffect(() => clearTimer, []);

  return {
    start,
    pause,
    resume,
    stop,
    getElapsedMS,
    getPausedMS,
    getRemainingMS,
    getTotalMS,
    isIdle: (() => statusRef.current === 'idle')(),
    isRunning: (() => statusRef.current === 'running')(),
    isPaused: (() => statusRef.current === 'paused')(),
    isFinished: (() => statusRef.current === 'finished')(),
  };
};
