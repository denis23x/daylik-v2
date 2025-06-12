import { useEffect, useRef, useState } from 'react';

// TODO: env
const DELAY = 50;

type TimerStatus = 'idle' | 'running' | 'paused' | 'finished';

export const useTimer = (duration: number) => {
  const [progress, setProgress] = useState(100);
  const [status, setStatus] = useState<TimerStatus>('idle');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pauseStartRef = useRef<number | null>(null);
  const totalPausedRef = useRef<number>(0);

  const getNow = () => performance.now();

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const update = () => {
    if (!startTimeRef.current) return;

    const now = getNow();
    const pausedTime = totalPausedRef.current;
    const effectiveNow = status === 'paused' && pauseStartRef.current ? pauseStartRef.current : now;

    const elapsed = Math.min(duration, effectiveNow - startTimeRef.current - pausedTime);
    const remaining = Math.max(0, duration - elapsed);
    const newProgress = (remaining / duration) * 100;

    setProgress(newProgress);

    if (remaining <= 0) {
      clear();
      setStatus('finished');
    }
  };

  const start = () => {
    if (status !== 'idle') return;

    startTimeRef.current = getNow();
    totalPausedRef.current = 0;
    pauseStartRef.current = null;
    setStatus('running');

    intervalRef.current = setInterval(update, DELAY);
  };

  const pause = () => {
    if (status !== 'running') return;

    clear();
    pauseStartRef.current = getNow();
    setStatus('paused');
  };

  const resume = () => {
    if (status !== 'paused' || !pauseStartRef.current) return;

    const now = getNow();
    totalPausedRef.current += now - pauseStartRef.current;
    pauseStartRef.current = null;
    setStatus('running');

    intervalRef.current = setInterval(update, DELAY);
  };

  const stop = () => {
    clear();
    startTimeRef.current = null;
    pauseStartRef.current = null;
    totalPausedRef.current = 0;
    setProgress(100);
    setStatus('idle');
  };

  const getElapsedMS = () => {
    if (!startTimeRef.current) return 0;
    const now = status === 'paused' && pauseStartRef.current ? pauseStartRef.current : getNow();
    return Math.min(duration, now - startTimeRef.current - totalPausedRef.current);
  };

  const getPausedMS = () => {
    if (!startTimeRef.current) return 0;
    const now = getNow();
    if (status === 'paused' && pauseStartRef.current) {
      return totalPausedRef.current + (now - pauseStartRef.current);
    }
    return totalPausedRef.current;
  };

  const getTotalMS = () => {
    if (!startTimeRef.current) return 0;
    const now = getNow();
    return now - startTimeRef.current;
  };

  useEffect(() => () => clear(), []);

  return {
    start,
    pause,
    resume,
    stop,
    progress,
    status,
    getElapsedMS,
    getPausedMS,
    getTotalMS,
  };
};
