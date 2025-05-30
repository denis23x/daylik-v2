'use client';

import { Button } from '@/components/ui/button';
import { useSyncSettingsStore } from '@/store/useSyncSettingsStore';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { CalendarCog, Shuffle, X } from 'lucide-react';
import { useSync } from '@/hooks/useSync';
import ErrorOccurred from '@/components/error-occurred';
import NotFound from '@/components/not-found';
import { Skeleton } from '@/components/ui/skeleton';
import {
  NumberInputDecrement,
  NumberInputField,
  NumberInputGroup,
  NumberInputIncrement,
} from '@/components/ui/number-input';
import { NumberInput } from '@/components/ui/number-input';
import GridWithHoverEffect from '@/components/grid-with-hover-effect';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getContrastingColor } from '@/utils/getContrastingColor';

const SyncGridSettings = () => {
  const params = useParams();
  const { team, teammates, setTeam, setTeammates, shuffle, reset } = useSyncSettingsStore();
  const { data, isLoading, error } = useSync({
    query: `*, teams_teammates (teammates (UUID, name, position, color, avatar))`,
    UUID: params.UUID as string,
  });

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (data) {
      const team = data as Team;

      // Pass to render
      setTeam(team);
      setTeammates(team.teammates as Teammate[]);
    }
  }, [data, setTeam, setTeammates]);

  const handleShuffle = () => {
    shuffle();
  };

  const handleStart = () => {
    console.log('handleStart');
  };

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <CalendarCog />
          <span className="text-xl font-bold">{team?.name}</span>
        </div>
        <div className="flex w-full items-center gap-4">
          <NumberInput defaultValue={60} className="max-w-40">
            <NumberInputGroup>
              <NumberInputDecrement />
              <NumberInputField />
              <NumberInputIncrement />
            </NumberInputGroup>
          </NumberInput>
          <Button variant="outline" size="icon" onClick={handleShuffle}>
            <Shuffle />
          </Button>
          <Button onClick={handleStart}>Start Sync</Button>
        </div>
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
            <GridWithHoverEffect>
              {teammates?.map((teammate: Teammate) => (
                <Card className="bg-background size-full gap-0 p-2" key={teammate.UUID}>
                  <CardHeader className="relative gap-0">
                    <Button
                      className="absolute top-0 right-0 z-10 rounded-full"
                      variant="destructive"
                      size="icon"
                    >
                      <X />
                    </Button>
                  </CardHeader>
                  <CardContent className="translate-y-2 p-4 sm:p-3">
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
                  <CardFooter className="flex flex-col items-stretch p-0 text-center">
                    <span className="truncate text-lg font-semibold sm:text-2xl">
                      {teammate.name}
                    </span>
                    <p className="text-muted-foreground truncate text-xs sm:text-sm">
                      {teammate.position}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </GridWithHoverEffect>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncGridSettings;
