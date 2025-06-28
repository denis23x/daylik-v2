import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { Button } from '@/components/ui/button';
import { Check, Pause, Play, Siren, UserRound } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';
import { useTimer } from '@/hooks/ui/useTimer';
import { useStopwatch } from '@/hooks/ui/useStopwatch';
import { useEffect, useRef } from 'react';
import type { SyncTeam } from '@/types/syncTeam.type';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import { AnimatePresence, motion } from 'motion/react';

export const SyncLiveCard = ({
  team,
  teammate,
  showRoles,
}: {
  team: SyncTeam;
  teammate: SyncTeammate;
  showRoles: boolean;
}) => {
  const { setActive, setDone } = useSyncLiveStore();
  const timer = useTimer(team.timer);
  const stopwatch = useStopwatch(team.timer);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (teammate.sync.status === 'active') {
      timer.start();
    }
    if (teammate.sync.status === 'done') {
      timer.stop();
      stopwatch.stop();
    }
    if (teammate.sync.status === 'committed') {
      setDone(teammate.UUID, timer, stopwatch);
    }
  }, [teammate.sync.status, teammate.UUID, timer, stopwatch, setDone]);

  useEffect(() => {
    if (timer.status === 'finished') {
      stopwatch.start();
    }
  }, [timer.status, stopwatch]);

  const handleActive = () => {
    if (teammate.sync.status === 'idle') {
      setActive(teammate.UUID);
    }
  };

  const handleDone = () => {
    if (teammate.sync.status === 'active') {
      setDone(teammate.UUID, timer, stopwatch);
    }
  };

  const handleSiren = (clientX: number, clientY: number) => {
    const scalar = 3;
    const emojis = [
      '❓',
      '❗️',
      '❌',
      '‼️',
      '⛔️',
      '🚫',
      '🚨',
      '🔴',
      '💔',
      '🐞',
      '🥊',
      '☎️',
      '🤬',
      '😡',
      '🆘',
      '🦞',
    ];

    const shapes = emojis.map((emoji) => confetti.shapeFromText({ text: emoji, scalar }));

    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;

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

    // SkewX animation
    if (cardRef.current) {
      cardRef.current.classList.remove('animate-skew-x');
      setTimeout(() => cardRef.current?.classList.add('animate-skew-x'));
    }
  };

  return (
    <div ref={cardRef} className={`flip-card aspect-[3/3.75] ${teammate.sync?.status}`}>
      <div className="flip-card-inner p-0">
        <Card className="flip-card-front gap-2 p-2">
          <CardContent className="flex size-full items-center justify-center">
            <div className="flex translate-y-4 flex-col items-center gap-2">
              <UserRound />
              <AnimatePresence initial={false}>
                {showRoles ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <span className="font-semibold">{teammate.role}</span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch p-0">
            <Button variant="outline" onClick={handleActive}>
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
                      ? handleSiren(e.clientX, e.clientY)
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
                  onClick={handleDone}
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
