import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { Button } from '@/components/ui/button';
import { Check, Pause, Play, Siren, UserRound } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';
import { useTimer } from '@/hooks/ui/useTimer';
import { useStopwatch } from '@/hooks/ui/useStopwatch';
import { useEffect } from 'react';
import type { SyncTeam } from '@/types/syncTeam.type';
import type { SyncTeammate } from '@/types/syncTeammate.type';

export const SyncLiveCard = ({
  team,
  teammate,
  showRoles,
}: {
  team: SyncTeam;
  teammate: SyncTeammate;
  showRoles: boolean;
}) => {
  const { setActive } = useSyncLiveStore();
  const timer = useTimer(team.sync.timer * 1000);
  const stopwatch = useStopwatch(team.sync.timer * 1000);

  useEffect(() => {
    if (teammate.sync.status === 'active') {
      timer.start();
    }
    if (teammate.sync.status === 'done') {
      timer.stop();
      stopwatch.stop();
    }
  }, [teammate.sync.status, timer, stopwatch]);

  useEffect(() => {
    if (timer.status === 'finished') {
      stopwatch.start();
    }
  }, [timer.status, stopwatch]);

  const handleActive = (status: string) => {
    if (teammate.sync.status === status) {
      setActive(teammate.UUID);
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
            <Button variant="outline" onClick={() => handleActive('idle')}>
              Reveal
            </Button>
          </CardFooter>
        </Card>
        <Card className="flip-card-back relative flex flex-col items-center justify-center rounded-xl border">
          <CardContent>
            <div className="flex max-w-full flex-col items-center justify-center gap-0.5 text-center sm:gap-2">
              {timer.progress === 0 ? (
                <Badge
                  className="scale-90 sm:scale-100"
                  variant={stopwatch.overtime >= 1 ? 'destructive' : 'secondary'}
                >
                  Overtime {stopwatch.overtime >= 1 ? `x${stopwatch.overtime.toFixed(1)}` : ''}
                </Badge>
              ) : (
                <Badge className="scale-90 sm:scale-100" variant="secondary">
                  <span className="first-letter:uppercase">
                    {teammate.sync?.status === 'active'
                      ? timer.status === 'running'
                        ? 'Active'
                        : 'Paused'
                      : 'Done'}
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
                  <CircularProgress className="opacity-50" value={timer.progress} strokeWidth={2} />
                </div>
                <Button
                  className="absolute bottom-2 left-2 rounded-full 2xl:bottom-3 2xl:left-3"
                  variant="secondary"
                  size="syncIcon"
                  onClick={(e) =>
                    timer.progress === 0
                      ? handleSiren(e)
                      : timer.status === 'running'
                        ? timer.pause()
                        : timer.resume()
                  }
                >
                  {timer.progress === 0 ? (
                    <Siren />
                  ) : timer.status === 'running' ? (
                    <Pause />
                  ) : (
                    <Play />
                  )}
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
