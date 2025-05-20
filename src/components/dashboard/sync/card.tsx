import { useEffect, useState } from 'react';
import { useSyncStore } from '@/store/useSyncStore';
import type { TeammateWithState } from '@/types/teammateWithState.type';
import { Button } from '@/components/ui/button';
import { Check, Pause, Play, RefreshCcw, UserRound } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Badge } from '@/components/ui/badge';

const TOTAL_SECONDS = 10;

export const SyncCard = ({ teammate }: { teammate: TeammateWithState }) => {
  const { setActive, setDone } = useSyncStore();
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const [running, setRunning] = useState(false);
  const [overtime, setOvertime] = useState(0);

  useEffect(() => {
    if (teammate.state.status === 'active') {
      setRunning(true);
    } else if (teammate.state.status === 'done') {
      setRunning(false);
    }
  }, [teammate.state.status]);

  useEffect(() => {
    if (running && remaining > 0) {
      const interval = setInterval(() => setRemaining((r) => r - 1), 1000);
      return () => clearInterval(interval);
    }
    if (remaining === 0 && running) {
      setRunning(false);
      setOvertime(overtime + 1);
    }
  }, [running, remaining, teammate.UUID, overtime]);

  const handleClick = () => {
    if (teammate.state.status === 'idle') {
      setActive(teammate.UUID);
    }
  };

  const handleProgress = (secondsPassed: number): number => {
    return (Math.min(Math.max(secondsPassed, 0), TOTAL_SECONDS) / TOTAL_SECONDS) * 100;
  };

  const handleOvertime = () => {
    setRemaining(TOTAL_SECONDS);
    setRunning(true);
  };

  return (
    <div className={`flip-card rounded-xl ${teammate.state?.status}`} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front bg-muted flex items-center justify-center rounded-xl border">
          <UserRound />
        </div>
        <div className="flip-card-back relative flex flex-col items-center justify-center rounded-xl border">
          <div className="flex max-w-full flex-col items-center justify-center gap-0.5 text-center sm:gap-2">
            {!!overtime ? (
              <Badge className="scale-90 sm:scale-100" variant="destructive">
                Overtime {overtime > 1 ? `x${overtime}` : ''}
              </Badge>
            ) : (
              <Badge className="scale-90 sm:scale-100" variant="secondary">
                <span className="first-letter:uppercase">
                  {teammate.state?.status === 'active' ? (running ? 'Active' : 'Paused') : 'Done'}
                </span>
              </Badge>
            )}
            <span className="max-w-full overflow-hidden px-2 text-lg font-semibold text-ellipsis sm:text-2xl">
              {teammate.name}
            </span>
            <p className="text-muted-foreground max-w-full overflow-hidden px-4 text-xs text-ellipsis sm:text-sm">
              {teammate.position}
            </p>
          </div>
          {teammate.state.status !== 'done' && (
            <>
              <div className="pointer-events-none absolute inset-0 p-6">
                <CircularProgress
                  className="opacity-50"
                  value={handleProgress(remaining)}
                  strokeWidth={2}
                />
              </div>
              <Button
                className="absolute bottom-2 left-2 rounded-full 2xl:bottom-3 2xl:left-3"
                variant="secondary"
                size="syncIcon"
                onClick={() => (remaining === 0 ? handleOvertime() : setRunning(!running))}
              >
                {remaining === 0 ? <RefreshCcw /> : running ? <Pause /> : <Play />}
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
        </div>
      </div>
    </div>
  );
};
