import { useEffect, useRef, useState } from 'react';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import type { TeammateSync } from '@/types/teammateSync.type';
import { Button } from '@/components/ui/button';
import { Check, Pause, Play, RefreshCcw, UserRound } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export const SyncCard = ({ teammate }: { teammate: TeammateSync }) => {
  const { timer, showRoles, setActive, setDone } = useSyncLiveStore();
  const [running, setRunning] = useState(false);
  const [overtime, setOvertime] = useState(0);
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);

  useEffect(() => {
    if (teammate.sync.status === 'active') {
      setRunning(true);
    } else if (teammate.sync.status === 'done') {
      setRunning(false);
    }
  }, [teammate.sync.status]);

  useEffect(() => {
    if (running) {
      if (startedRef.current === null) {
        startedRef.current = Date.now() - elapsedRef.current;
      }

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - (startedRef.current ?? 0);
        const remaining = timer * 1000 - elapsed;

        // Save elapsed time for next reset
        elapsedRef.current = elapsed;

        if (remaining <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;

          startedRef.current = null;
          elapsedRef.current = 0;

          setProgress(0);
          setRunning(false);
          setOvertime((prev) => prev + 1);
        } else {
          setProgress((remaining / (timer * 1000)) * 100);
        }
      }, 50);

      return () => {
        clearInterval(intervalRef.current!);
      };
    } else {
      clearInterval(intervalRef.current!);

      intervalRef.current = null;
      startedRef.current = null;
    }
  }, [running, timer]);

  const handleReveal = () => {
    if (teammate.sync.status === 'idle') {
      setActive(teammate.UUID);
    }
  };

  const handleOvertime = () => {
    startedRef.current = Date.now();
    elapsedRef.current = 0;

    setProgress(100);
    setRunning(true);
  };

  return (
    <div className={`flip-card aspect-[3/3.75] ${teammate.sync?.status}`}>
      <div className="flip-card-inner p-0">
        <Card className="flip-card-front bg-muted gap-2 p-2">
          <CardContent className="flex size-full items-center justify-center">
            <div className="flex translate-y-4 flex-col items-center gap-2">
              <UserRound />
              {showRoles && <span className="font-semibold">{teammate.role}</span>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch p-0">
            <Button variant="outline" onClick={handleReveal}>
              Reveal
            </Button>
          </CardFooter>
        </Card>
        <Card className="flip-card-back relative flex flex-col items-center justify-center rounded-xl border">
          <CardContent>
            <div className="flex max-w-full flex-col items-center justify-center gap-0.5 text-center sm:gap-2">
              {!!overtime ? (
                <Badge className="scale-90 sm:scale-100" variant="destructive">
                  Overtime {overtime > 1 ? `x${overtime}` : ''}
                </Badge>
              ) : (
                <Badge className="scale-90 sm:scale-100" variant="secondary">
                  <span className="first-letter:uppercase">
                    {teammate.sync?.status === 'active' ? (running ? 'Active' : 'Paused') : 'Done'}
                  </span>
                </Badge>
              )}
              <span className="max-w-full truncate px-2 text-lg font-semibold sm:text-2xl">
                {teammate.name}
              </span>
              <p className="text-muted-foreground max-w-full truncate px-4 text-xs sm:text-sm">
                {teammate.role}
              </p>
            </div>
            {teammate.sync.status !== 'done' && (
              <>
                <div className="pointer-events-none absolute inset-0 p-5">
                  <CircularProgress className="opacity-50" value={progress} strokeWidth={2} />
                </div>
                <Button
                  className="absolute bottom-2 left-2 rounded-full 2xl:bottom-3 2xl:left-3"
                  variant="secondary"
                  size="syncIcon"
                  onClick={() => (progress === 0 ? handleOvertime() : setRunning(!running))}
                >
                  {progress === 0 ? <RefreshCcw /> : running ? <Pause /> : <Play />}
                </Button>
                <Button
                  className="absolute right-2 bottom-2 rounded-full 2xl:right-3 2xl:bottom-3"
                  variant="secondary"
                  size="syncIcon"
                  onClick={() => setDone(teammate.UUID)}
                >
                  <Check />
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
