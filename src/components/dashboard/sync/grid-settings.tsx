'use client';

import { Button } from '@/components/ui/button';
import { useSyncSettingsStore } from '@/store/useSyncSettingsStore';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { CalendarCog, Clock, Undo2, X } from 'lucide-react';
import { useSync } from '@/hooks/useSync';
import ErrorOccurred from '@/components/error-occurred';
import NotFound from '@/components/not-found';
import { Skeleton } from '@/components/ui/skeleton';
import HoverEffect from '@/components/hover-effect';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getContrastingColor } from '@/utils/getContrastingColor';
import TimerPicker from '@/components/timer-picker';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { toast } from 'sonner';

// teammatesAbsent reducer
function reducer(state: string[], action: { type: 'add' | 'remove'; UUID: string }): string[] {
  switch (action.type) {
    case 'add':
      return state.includes(action.UUID) ? state : [...state, action.UUID];
    case 'remove':
      return state.filter((item) => item !== action.UUID);
    default:
      return state;
  }
}

const SyncGridSettings = () => {
  const params = useParams();
  const [teammatesAbsent, dispatch] = useReducer(reducer, []);
  const [teammatesDuration, setTeammatesDuration] = useState(0);
  const { team, teammates, timer, setTeam, setTeammates } = useSyncSettingsStore();
  const { setSyncStart } = useSyncLiveStore();
  const { data, isLoading, error } = useSync({
    query: `*, teams_teammates (teammates (UUID, name, role, color, avatar))`,
    UUID: params.UUID as string,
  });

  useEffect(() => {
    if (data) {
      const { teammates, ...team } = data as Team;

      // Pass to render
      setTeam(team);
      setTeammates(teammates as Teammate[]);
    }
  }, [data, setTeam, setTeammates]);

  useEffect(() => {
    const duration = (timer * ((teammates?.length || 0) - teammatesAbsent.length)) / 60;

    setTeammatesDuration(duration);
  }, [timer, teammates, teammatesAbsent]);

  const handleStart = () => {
    setSyncStart(
      team as Team,
      teammates.filter((teammate: Teammate) => !teammatesAbsent.includes(teammate.UUID)),
      timer
    );

    // Success
    toast.success('Sync is live — let the updates begin');
  };

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <CalendarCog />
          {isLoading && <Skeleton className="h-7 w-24" />}
          {error && <span className="text-xl font-bold">Error</span>}
          {!isLoading && !error && (
            <p className="flex items-center gap-2">
              <span className="text-xl font-bold">Sync</span>
              <span className="text-muted-foreground mt-1 text-sm">
                ~ {teammatesDuration.toFixed()} min.
              </span>
            </p>
          )}
        </div>
        {!isLoading && !error && teammates?.length !== 0 && (
          <div className="flex w-full items-end gap-4">
            <TimerPicker>
              <Button variant="outline" size="icon">
                <Clock />
              </Button>
            </TimerPicker>
            <RainbowButton
              disabled={teammatesAbsent.length === teammates?.length}
              onClick={handleStart}
            >
              Start {team?.name} Sync
            </RainbowButton>
          </div>
        )}
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && (
            <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {[1, 2, 3, 4].map((_, index) => (
                <li key={index}>
                  <Skeleton className="aspect-[3/3.75] min-h-[224px] max-w-full rounded-xl" />
                </li>
              ))}
            </ul>
          )}
          {error && <ErrorOccurred className="min-h-[224px]" />}
          {!isLoading && !error && teammates?.length === 0 && (
            <NotFound className="min-h-[224px]" />
          )}
          {!isLoading && !error && teammates?.length !== 0 && (
            <HoverEffect>
              {teammates?.map((teammate: Teammate) => (
                <Card className="bg-background size-full gap-0 p-2" key={teammate.UUID}>
                  <CardHeader className="relative gap-0">
                    {teammatesAbsent.includes(teammate.UUID) ? (
                      <Button
                        className="absolute top-0 right-0 z-10 rounded-full"
                        variant="secondary"
                        size="icon"
                        onClick={() => dispatch({ type: 'remove', UUID: teammate.UUID })}
                      >
                        <Undo2 />
                      </Button>
                    ) : (
                      <Button
                        className="absolute top-0 right-0 z-10 rounded-full"
                        variant="destructive"
                        size="icon"
                        onClick={() => dispatch({ type: 'add', UUID: teammate.UUID })}
                      >
                        <X />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent
                    className={`translate-y-2 p-4 transition-[opacity,filter] duration-200 sm:p-3 ${
                      teammatesAbsent.includes(teammate.UUID) ? 'opacity-25 grayscale' : ''
                    }`}
                  >
                    <Avatar className="aspect-square size-full border">
                      <AvatarImage
                        className="bg-secondary object-cover"
                        src={teammate.avatar || undefined}
                      />
                      <AvatarFallback style={{ backgroundColor: teammate.color }}>
                        <span
                          className="text-xl"
                          style={{ color: getContrastingColor(teammate.color) }}
                        >
                          {teammate.name.slice(0, 2).toUpperCase()}
                        </span>
                      </AvatarFallback>
                    </Avatar>
                  </CardContent>
                  <CardFooter
                    className={`flex flex-col items-stretch p-0 text-center transition-[opacity,filter] duration-200 ${
                      teammatesAbsent.includes(teammate.UUID) ? 'opacity-25 grayscale' : ''
                    }`}
                  >
                    <span className="truncate text-lg font-semibold sm:text-2xl">
                      {teammate.name}
                    </span>
                    <p className="text-muted-foreground truncate text-xs sm:text-sm">
                      {teammate.role}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </HoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncGridSettings;
