import { useEffect, useRef, useState } from 'react';

type StopwatchStatus = 'idle' | 'running' | 'finished';

export const useStopwatch = (duration: number) => {
  const [overtime, setOvertime] = useState(0);
  const [status, setStatus] = useState<StopwatchStatus>('idle');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

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
    const elapsed = now - startTimeRef.current;

    const rawOvertime = elapsed / duration;
    const roundedOvertime = Math.floor(rawOvertime * 10) / 10;

    setOvertime(roundedOvertime);
  };

  const start = () => {
    if (status === 'running') return;

    startTimeRef.current = getNow();
    setStatus('running');
    setOvertime(0);

    intervalRef.current = setInterval(update, 50);
  };

  const stop = () => {
    if (status === 'idle') return;

    clear();
    startTimeRef.current = null;
    setOvertime(0);
    setStatus('finished');
  };

  useEffect(() => () => clear(), []);

  return {
    start,
    stop,
    overtime,
    status,
  };
};
