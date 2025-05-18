import { useEffect, useState } from 'react';
import { useSyncStore } from '@/store/useSyncStore';
import type { TeammateWithState } from '@/types/teammateWithState.type';
import { Button } from '@/components/ui/button';

export const SyncCard = ({ teammate }: { teammate: TeammateWithState }) => {
  const { setActive, finishTeammate } = useSyncStore();
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);

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
      finishTeammate(teammate.UUID);
    }
  }, [running, remaining, teammate.UUID]);

  const handleClick = () => {
    if (teammate.state.status === 'idle') {
      setActive(teammate.UUID);
    }
  };

  return (
    <div className={`flip-card ${teammate.state?.status}`} onClick={handleClick}>
      <div className="flip-card-inner">
        <div className="flip-card-front">???</div>
        <div className="flip-card-back">
          <h1>{teammate.name}</h1>
          <p>{remaining}s</p>
          <div className="flex gap-2">
            {teammate.state.status === 'done' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/60 text-xl font-bold text-white">
                ✅ Выступил
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setRunning(!running);
              }}
            >
              {running ? 'Pause' : 'Resume'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setRunning(false);
                finishTeammate(teammate.UUID);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
