import { useCallback, useEffect, useRef, useState } from 'react';

type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

interface TimerOptions {
  duration: number;
  onStart?: () => void;
  onFinish?: () => void;
}

export const useTimer = ({ duration, onStart, onFinish }: TimerOptions) => {
  const [status, setStatus] = useState<TimerStatus>('idle');

  const createdAtRef = useRef<string | null>(null);
  const finishedAtRef = useRef<string | null>(null);

  const startTimestampRef = useRef<number | null>(null);
  const pauseStartRef = useRef<number | null>(null);
  const totalPausedMSRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const rerender = useState(0)[1];
  const tick = () => rerender((t) => t + 1);

  const getNow = () => performance.now();

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const getElapsedMS = useCallback(() => {
    if (!startTimestampRef.current) return 0;

    const now = status === 'paused' && pauseStartRef.current ? pauseStartRef.current : getNow();

    const elapsed = now - startTimestampRef.current - totalPausedMSRef.current;
    return Math.min(duration, elapsed);
  }, [status, duration]);

  const getPausedMS = useCallback(() => {
    if (status !== 'paused' || !pauseStartRef.current) return totalPausedMSRef.current;
    return totalPausedMSRef.current + (getNow() - pauseStartRef.current);
  }, [status]);

  const getTotalMS = useCallback(() => {
    if (!startTimestampRef.current) return 0;
    return Math.min(getPausedMS() + getElapsedMS(), getNow() - startTimestampRef.current);
  }, [getElapsedMS, getPausedMS]);

  const getRemainingMS = useCallback(() => {
    return Math.max(0, duration - getElapsedMS());
  }, [duration, getElapsedMS]);

  const start = useCallback(() => {
    if (status !== 'idle') return;
    const now = getNow();
    startTimestampRef.current = now;
    pauseStartRef.current = null;
    totalPausedMSRef.current = 0;
    createdAtRef.current = new Date().toISOString();
    finishedAtRef.current = null;
    setStatus('running');
    onStart?.();
    tick();

    timeoutRef.current = setTimeout(() => {
      setStatus('finished');
      finishedAtRef.current = new Date().toISOString();
      onFinish?.();
      tick();
    }, duration);
  }, [status, duration, onStart, onFinish]);

  const pause = useCallback(() => {
    if (status !== 'running') return;
    clearTimer();
    pauseStartRef.current = getNow();
    setStatus('paused');
    tick();
  }, [status]);

  const resume = useCallback(() => {
    if (status !== 'paused' || !pauseStartRef.current) return;
    const now = getNow();
    const pausedDuration = now - pauseStartRef.current;
    totalPausedMSRef.current += pausedDuration;
    pauseStartRef.current = null;

    const remaining = duration - getElapsedMS();
    if (remaining <= 0) {
      setStatus('finished');
      finishedAtRef.current = new Date().toISOString();
      onFinish?.();
      tick();
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setStatus('finished');
      finishedAtRef.current = new Date().toISOString();
      onFinish?.();
      tick();
    }, remaining);

    setStatus('running');
    tick();
  }, [status, duration, getElapsedMS, onFinish]);

  const stop = useCallback(() => {
    clearTimer();
    startTimestampRef.current = null;
    pauseStartRef.current = null;
    totalPausedMSRef.current = 0;
    createdAtRef.current = null;
    finishedAtRef.current = null;
    setStatus('idle');
    tick();
  }, []);

  const getCreatedAt = () => createdAtRef.current;
  const getFinishedAt = () => finishedAtRef.current;

  // Status getters
  const isIdle = status === 'idle';
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isFinished = status === 'finished';

  useEffect(() => clearTimer, []);

  return {
    start,
    pause,
    resume,
    stop,
    getRemainingMS,
    getElapsedMS,
    getTotalMS,
    getPausedMS,
    getCreatedAt,
    getFinishedAt,
    status,
    isIdle,
    isRunning,
    isPaused,
    isFinished,
  };
};
