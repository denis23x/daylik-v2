import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { Button } from '@/components/ui/button';
import { Check, Pause, Play, RefreshCcw, Siren } from 'lucide-react';
import { CircularProgress } from '@/components/ui/circular-progress';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';
import { useTimer } from '@/hooks/ui/useTimer';
import { useStopwatch } from '@/hooks/ui/useStopwatch';
import { useEffect, useRef, useState } from 'react';
import type { SyncTeam } from '@/types/syncTeam.type';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import { AnimatePresence, motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AvatarInitials from '@/components/avatar-initials';

const SyncLiveCard = ({ team, teammate }: { team: SyncTeam; teammate: SyncTeammate }) => {
  const { setActive, setDone, showRoles, showNames } = useSyncLiveStore();
  const timer = useTimer(team.timer);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const stopwatch = useStopwatch(team.timer);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (teammate.sync.status === 'active') {
      timer.start();
    }
    if (teammate.sync.status === 'done') {
      // Save progress to display on the back of the card when status is done
      setProgress(progress === undefined ? timer.progress : progress);

      timer.stop();
      stopwatch.stop();
    }
    if (teammate.sync.status === 'committed') {
      setDone(teammate.UUID, timer, stopwatch);
    }
  }, [teammate.sync.status, teammate.UUID, timer, stopwatch, progress, setDone, setProgress]);

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
    <div className={`flip-card aspect-[3/3.75] ${teammate.sync?.status}`} ref={cardRef}>
      <div className="flip-card-inner p-0" id={teammate.UUID}>
        <Card className="flip-card-front cursor-pointer gap-2 p-2" onClick={handleActive}>
          <CardContent className="flex size-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <AnimatePresence mode="wait">
                {showRoles ? (
                  <motion.div
                    key="role"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <span className="truncate text-lg font-semibold sm:text-2xl">
                      {teammate.role}
                    </span>
                  </motion.div>
                ) : showNames ? (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <span className="truncate text-lg font-semibold sm:text-2xl">
                      {teammate.name}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="icon"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <RefreshCcw />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
        <Card className="flip-card-back size-full gap-0 p-2">
          <CardHeader className="relative gap-0">
            {teammate.sync.status === 'active' && (
              <div>
                <Button
                  className="absolute top-0 left-0 z-10 rounded-full"
                  variant="secondary"
                  size="icon"
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
                  className="absolute top-0 right-0 z-10 rounded-full"
                  variant="secondary"
                  size="icon"
                  onClick={handleDone}
                >
                  <Check />
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="translate-y-2 p-4 sm:p-3">
            <div className="p-1.5">
              <Avatar className="aspect-square size-full border-none">
                <AvatarImage
                  className="bg-secondary object-cover"
                  src={teammate.avatar || undefined}
                />
                <AvatarFallback style={{ backgroundColor: teammate.color }}>
                  <AvatarInitials className="text-2xl" teammate={teammate} />
                </AvatarFallback>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2">
                  {timer.progress === 0 ? (
                    <Badge
                      className="scale-90 pb-2 opacity-100 sm:scale-100"
                      variant={stopwatch.overtime >= 1 ? 'destructive' : 'secondary'}
                    >
                      Overtime
                    </Badge>
                  ) : (
                    <Badge className="scale-90 pb-2 opacity-100 sm:scale-100" variant="secondary">
                      <span className="first-letter:uppercase">
                        {teammate.sync?.status === 'active'
                          ? timer.status === 'running'
                            ? 'Active'
                            : 'Paused'
                          : 'Done'}
                      </span>
                    </Badge>
                  )}
                </div>
              </Avatar>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key="progress"
                className="pointer-events-none absolute inset-0 p-4 sm:p-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CircularProgress
                  className="opacity-50"
                  value={teammate.sync?.status === 'done' ? progress || 0 : timer.progress}
                  strokeWidth={2}
                />
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch p-0 text-center">
            <span className="truncate text-lg font-semibold sm:text-2xl">{teammate.name}</span>
            <p className="text-muted-foreground truncate text-xs sm:text-sm">{teammate.role}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SyncLiveCard;
