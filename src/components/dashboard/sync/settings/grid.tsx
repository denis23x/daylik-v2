'use client';

import { Button } from '@/components/ui/button';
import { useSyncSettingsStore } from '@/store/useSyncSettingsStore';
import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { lazy, Suspense, useEffect, useReducer, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { ArrowRight, CalendarCog, Clock } from 'lucide-react';
import { useSync } from '@/hooks/useSync';
import { Skeleton } from '@/components/ui/skeleton';
import TimerPicker from '@/components/dashboard/sync/settings/timer-picker';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { useUpdateTeam } from '@/hooks/useTeams';
import { formatDuration } from '@/utils/formatDuration';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEstimatedSyncTime } from '@/hooks/ui/useEstimatedSyncTime';
import Link from 'next/link';
import { useChangedIndexes } from '@/hooks/ui/useChangedIndexes';
import { useUpdateTeammatesInTeam } from '@/hooks/useTeamsTeammates';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import HoverEffectSkeletons from '@/components/dx/hover-effect/hover-effect-skeletons';
import HoverEffectError from '@/components/dx/hover-effect/hover-effect-error';
import HoverEffectNotFound from '@/components/dx/hover-effect/hover-effect-not-found';

// prettier-ignore
const HoverEffectWithSorting = lazy(() => import('@/components/dx/hover-effect/hover-effect-with-sorting'));
const SyncSettingsCard = lazy(() => import('./card'));

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

const SyncSettingsGrid = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const params = useParams();
  const router = useRouter();
  const [teammatesAbsent, dispatch] = useReducer(reducer, []);
  const [estimatedSyncTime, setEstimatedSyncTime] = useState(0);
  const { getEstimatedSyncTime } = useEstimatedSyncTime();
  const { team, teammates, timer, setTeam, setTeammates, setTimer } = useSyncSettingsStore();
  const { setTeam: setLiveTeam, setTeammates: setLiveTeammates } = useSyncLiveStore();
  const { mutate: updateTeam } = useUpdateTeam();
  const { mutate: updateTeammatesOrder } = useUpdateTeammatesInTeam();
  const { indexes: teammatesIndexes } = useChangedIndexes(teammates);
  const { data, isLoading, error } = useSync({
    query: `*, teams_teammates (order, teammates (UUID, name, role, color, avatar))`,
    UUID: params.UUID as string,
    enabled: true,
  });

  useEffect(() => {
    if (data) {
      const { teammates, ...team } = data as Team;

      setTeam(team);
      setTeammates(teammates as Teammate[]);
      setTimer(team.timer);
    }
  }, [data, setTeam, setTeammates, setTimer]);

  useEffect(() => {
    const teammatesActive = teammates.length - teammatesAbsent.length;
    const estimatedSyncTime = Math.ceil(getEstimatedSyncTime(teammatesActive, timer) / 60);

    setEstimatedSyncTime(estimatedSyncTime);
  }, [timer, teammates, teammatesAbsent, getEstimatedSyncTime]);

  useEffect(() => {
    if (team) {
      const teammates = teammatesIndexes.map(({ UUID, newIndex }) => ({
        teammateUUID: UUID,
        order: newIndex,
      }));

      // Update teammates order
      updateTeammatesOrder({
        teamUUID: team?.UUID as string,
        teammates,
      });
    }
  }, [team, teammatesIndexes, updateTeammatesOrder]);

  const handleStart = () => {
    // Update timer if it has changed
    if (team?.timer !== timer) {
      updateTeam({
        UUID: team?.UUID as string,
        timer,
      });
    }

    setLiveTeam(team as Team);
    setLiveTeammates(teammates.filter(({ UUID }) => !teammatesAbsent.includes(UUID)));

    // Redirect
    router.push(`/sync/${params.UUID}/live`);
  };

  const SkeletonCards = (
    <HoverEffectSkeletons columns={4} className="aspect-[3/3.75] min-h-[224px]" />
  );

  const DesktopCards = (
    <HoverEffectWithSorting items={teammates} setItems={setTeammates}>
      {(teammate, dragHandle) => (
        <SyncSettingsCard
          key={teammate.UUID}
          teammate={teammate}
          teammatesAbsent={teammatesAbsent}
          dispatch={dispatch}
          dragHandle={dragHandle}
        />
      )}
    </HoverEffectWithSorting>
  );

  const MobileCards = (
    <ul className="hover-effect-grid">
      {teammates?.map((teammate: Teammate) => (
        <li className="flex" key={teammate.UUID}>
          <SyncSettingsCard
            teammate={teammate}
            teammatesAbsent={teammatesAbsent}
            dispatch={dispatch}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <CalendarCog />
          {isLoading && <Skeleton className="h-7 w-24" />}
          {error && <span className="text-xl font-bold">Sync</span>}
          {!isLoading && !error && (
            <p className="flex items-center gap-2">
              <span className="text-xl font-bold">{team?.name}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-muted-foreground mt-1 text-sm">
                    ~ {estimatedSyncTime} min.
                  </span>
                </TooltipTrigger>
                <TooltipContent collisionPadding={16} side="right">
                  <div className="flex flex-col gap-1">
                    <p>Estimated Sync time:</p>
                    <p>Timer × Participants + Timer for the host</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </p>
          )}
        </div>
        {!isLoading && !error && teammates?.length !== 0 && (
          <div className="flex w-full items-end gap-4">
            <TimerPicker>
              <Button variant="outline">
                <Clock /> {formatDuration(timer)}
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
          {isLoading && SkeletonCards}
          {error && <HoverEffectError />}
          {!isLoading && !error && teammates?.length === 0 && (
            <HoverEffectNotFound title="No teammates found">
              <Button className="group" variant="secondary" asChild>
                <Link href="/teams">
                  Teams
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </HoverEffectNotFound>
          )}
          {!isLoading && !error && teammates?.length !== 0 && (
            <Suspense fallback={SkeletonCards}>{sm ? DesktopCards : MobileCards}</Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncSettingsGrid;
