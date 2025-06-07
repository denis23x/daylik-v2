import { useEffect, useRef, useState } from 'react';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import { Button } from '@/components/ui/button';
import { Check, Pause, Play, Siren, UserRound } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import confetti from 'canvas-confetti';

export const SyncCard = ({ syncTeammate }: { syncTeammate: SyncTeammate }) => {
  const { team, showRoles, setActive, setDone } = useSyncLiveStore();
  const [running, setRunning] = useState(false);
  const [overtime, setOvertime] = useState(0);
  const [progress, setProgress] = useState(100);
  const intervalOvertimeRef = useRef<NodeJS.Timeout | null>(null);
  const intervalProgressRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);
  const timerRef = useRef<number>(team?.sync.timer ?? 0);

  useEffect(() => {
    if (running) {
      if (startedRef.current === null) {
        startedRef.current = Date.now() - elapsedRef.current;
      }

      intervalProgressRef.current = setInterval(() => {
        const elapsed = Date.now() - (startedRef.current ?? 0);
        const remaining = timerRef.current * 1000 - elapsed;

        // Save elapsed time for next reset
        elapsedRef.current = elapsed;

        if (remaining <= 0) {
          clearInterval(intervalProgressRef.current!);
          intervalProgressRef.current = null;

          startedRef.current = null;
          elapsedRef.current = 0;

          setProgress(0);
          setRunning(false);
        } else {
          setProgress((remaining / (timerRef.current * 1000)) * 100);
        }
      }, 50);
    }

    return () => {
      clearInterval(intervalProgressRef.current!);
      intervalProgressRef.current = null;
      startedRef.current = null;
    };
  }, [running]);

  useEffect(() => {
    if (progress === 0 && syncTeammate.sync.status === 'active') {
      const overtime = Date.now();

      intervalOvertimeRef.current = setInterval(() => {
        const elapsed = Date.now() - overtime;
        const ratio = elapsed / (timerRef.current * 1000);

        setOvertime(ratio);
      }, 100);
    }

    return () => {
      clearInterval(intervalOvertimeRef.current!);
      intervalOvertimeRef.current = null;
    };
  }, [progress, syncTeammate.sync.status]);

  useEffect(() => {
    if (syncTeammate.sync.status === 'active') {
      setRunning(true);
    } else if (syncTeammate.sync.status === 'done') {
      setRunning(false);
    }
  }, [syncTeammate.sync.status]);

  useEffect(() => {
    if (syncTeammate.sync.status === 'done') {
      // Calculate elapsed time
      const elapsed = elapsedRef.current / 1000 || timerRef.current + timerRef.current * overtime;

      // Set done with elapsed and overtime
      setDone(syncTeammate.UUID, parseInt(elapsed.toFixed()), parseFloat(overtime.toFixed(1)));

      // Reset progress
      clearInterval(intervalProgressRef.current!);
      intervalProgressRef.current = null;

      // Reset overtime
      clearInterval(intervalOvertimeRef.current!);
      intervalOvertimeRef.current = null;

      setOvertime(0);
      setProgress(100);
      startedRef.current = null;
      elapsedRef.current = 0;
    }
  }, [syncTeammate.sync.status, syncTeammate.UUID, setDone, overtime]);

  const handleActive = (status: string) => {
    if (syncTeammate.sync.status === status) {
      setActive(syncTeammate.UUID);
    }
  };

  const handleSiren = (e: React.MouseEvent<HTMLButtonElement>) => {
    const scalar = 3;
    const emojis = [
      '❓',
      '❗️',
      '❌',
      '‼️',
      '⛔️',
      '⚠️',
      '🚫',
      '🚨',
      '🙅‍♂️',
      '🔔',
      '👮‍♂️',
      '🔴',
      '💔',
      '💀',
      '🥊',
      '☎️',
    ];
    const shapes = emojis.map((emoji) => confetti.shapeFromText({ text: emoji, scalar }));

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const shoot = () => {
      confetti({
        particleCount: 40,
        spread: 360,
        ticks: 60,
        gravity: 0.6,
        decay: 0.92,
        startVelocity: 30,
        shapes,
        scalar,
        origin: { x, y },
      });
    };

    // Render confetti
    shoot();
  };

  return (
    <div className={`flip-card aspect-[3/3.75] ${syncTeammate.sync?.status}`}>
      <div className="flip-card-inner p-0">
        <Card className="flip-card-front bg-muted gap-2 p-2">
          <CardContent className="flex size-full items-center justify-center">
            <div className="flex translate-y-4 flex-col items-center gap-2">
              <UserRound />
              {showRoles && <span className="font-semibold">{syncTeammate.role}</span>}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch p-0">
            <Button variant="outline" onClick={() => handleActive('idle')}>
              Reveal
            </Button>
          </CardFooter>
        </Card>
        <Card className="flip-card-back relative flex flex-col items-center justify-center rounded-xl border">
          <CardContent>
            <div className="flex max-w-full flex-col items-center justify-center gap-0.5 text-center sm:gap-2">
              {progress === 0 ? (
                <Badge
                  className="scale-90 sm:scale-100"
                  variant={overtime >= 1 ? 'destructive' : 'secondary'}
                >
                  Overtime {overtime >= 1 ? `x${overtime.toFixed(1)}` : ''}
                </Badge>
              ) : (
                <Badge className="scale-90 sm:scale-100" variant="secondary">
                  <span className="first-letter:uppercase">
                    {syncTeammate.sync?.status === 'active'
                      ? running
                        ? 'Active'
                        : 'Paused'
                      : 'Done'}
                  </span>
                </Badge>
              )}
              <span className="max-w-full truncate px-2 text-lg font-semibold sm:text-2xl">
                {syncTeammate.name}
              </span>
              <p className="text-muted-foreground max-w-full truncate px-4 text-xs sm:text-sm">
                {syncTeammate.role}
              </p>
            </div>
            {syncTeammate.sync.status !== 'done' && (
              <>
                <div className="pointer-events-none absolute inset-0 p-5">
                  <CircularProgress className="opacity-50" value={progress} strokeWidth={2} />
                </div>
                <Button
                  className="absolute bottom-2 left-2 rounded-full 2xl:bottom-3 2xl:left-3"
                  variant="secondary"
                  size="syncIcon"
                  onClick={(e) => (progress === 0 ? handleSiren(e) : setRunning(!running))}
                >
                  {progress === 0 ? <Siren /> : running ? <Pause /> : <Play />}
                </Button>
                <Button
                  className="absolute right-2 bottom-2 rounded-full 2xl:right-3 2xl:bottom-3"
                  variant="secondary"
                  size="syncIcon"
                  onClick={() => handleActive('active')}
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
