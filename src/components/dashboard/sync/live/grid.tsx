'use client';

import { useSyncLiveStore } from '@/store/useSyncLiveStore';
import { ArrowRight, ClockFading, Dices, Eye, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { lazy, Suspense, useEffect, useState } from 'react';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { useSync } from '@/hooks/useSync';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { getIsLastActive } from '@/utils/getIsLastActive';
import { toast } from 'sonner';
import { useCreateAnalytics } from '@/hooks/useAnalytics';
import { useAddTeammatesToAnalytic } from '@/hooks/useAnalyticsTeammates';
import { Link, useRouter } from '@/i18n/navigation';
import CardView from './card-view';
import { useAutoScroll } from '@/hooks/ui/useAutoScroll';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import HoverEffectSkeletons from '@/components/dx/hover-effect/hover-effect-skeletons';
import HoverEffectError from '@/components/dx/hover-effect/hover-effect-error';
import HoverEffectNotFound from '@/components/dx/hover-effect/hover-effect-not-found';
import { motion, spring } from 'motion/react';
import { useTranslations } from 'next-intl';

// Mobile optimization
const HoverEffect = lazy(() => import('@/components/dx/hover-effect/hover-effect'));
const SyncLiveCard = lazy(() => import('./card'));

const SyncLiveGrid = () => {
  const t = useTranslations('components.dashboard.sync.live.grid');
  const sm = useMediaQuery('(min-width: 640px)');
  const params = useParams();
  const router = useRouter();
  const [isDone, setIsDone] = useState(false);
  const [isPristine, setIsPristine] = useState(false);
  const [isStarted, setIsStarted] = useState<string | null>(null);
  const { mutateAsync: createAnalytics } = useCreateAnalytics();
  const { mutateAsync: addTeammatesToAnalytic } = useAddTeammatesToAnalytic();
  const { team, teammates, active, setTeam, setTeammates, setActive, shuffle } = useSyncLiveStore();
  const { scrollTo } = useAutoScroll();
  const { isLoading, error, refetch } = useSync({
    query: `*, teams_teammates (order, teammates (UUID, name, role, color, avatar))`,
    UUID: params.UUID as string,
    enabled: false,
  });

  useEffect(() => {
    if (isStarted) return;
    const handleStart = async () => {
      if (!team || !teammates.length) {
        const sync = await refetch();

        if (sync.data) {
          const { data } = sync;
          const { teammates, ...team } = data as Team;

          setTeam(team as Team);
          setTeammates(teammates as Teammate[]);
        }
      }

      // Set the startedAt time
      setIsStarted(new Date().toISOString());
    };

    handleStart();
  }, [team, teammates, setTeam, setTeammates, refetch, isStarted]);

  useEffect(() => {
    if (!isDone) return;
    const handleFinish = async (): Promise<void> => {
      const analytics = await createAnalytics({
        teamUUID: team?.UUID as string,
        timer: team?.timer as number,
        startedAt: isStarted as string,
        finishedAt: new Date().toISOString(),
      });

      await addTeammatesToAnalytic({
        analyticUUID: analytics.UUID,
        teammates,
      });

      router.replace(`/analytics/${analytics.UUID}`);
    };

    toast.promise(handleFinish(), {
      loading: t('messages.saving'),
      success: t('messages.success'),
      error: (e: unknown) => (e instanceof Error ? e.message : t('messages.error')),
    });
  }, [isDone, isStarted, team, teammates, router, createAnalytics, addTeammatesToAnalytic, t]);

  useEffect(() => {
    if (teammates.length) {
      const isDone = teammates.every((teammate) => teammate.sync.status === 'done');
      const isPristine = teammates.every((teammate) => teammate.sync.status === 'idle');

      setIsDone(isDone);
      setIsPristine(isPristine);
    }
  }, [teammates, setIsDone, setIsPristine]);

  useEffect(() => {
    if (active) {
      // Scroll to the active card
      scrollTo(active);
    }
  }, [active, scrollTo]);

  const handleRandom = () => {
    const idle = teammates
      .filter((teammate) => teammate.sync.status === 'idle')
      .map((teammate) => teammate.UUID);

    if (idle.length) {
      setActive(idle[Math.floor(Math.random() * idle.length)]);
    }
  };

  const SkeletonCards = (
    <HoverEffectSkeletons columns={4} className="aspect-[3/3.75] min-h-[224px]" />
  );

  const DesktopCards = (
    <HoverEffect>
      {team &&
        teammates?.map((teammate: SyncTeammate) => (
          <SyncLiveCard team={team} teammate={teammate} key={teammate.UUID} />
        ))}
    </HoverEffect>
  );

  const MobileCards = (
    <ul className="hover-effect-grid">
      {team &&
        teammates?.map((teammate: SyncTeammate) => (
          <motion.li layout transition={spring} className="relative" key={teammate.UUID}>
            <SyncLiveCard team={team} teammate={teammate} />
          </motion.li>
        ))}
    </ul>
  );

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ClockFading />
          {(isLoading || !isStarted) && !error && <Skeleton className="h-7 w-24" />}
          {error && <span className="text-xl font-bold">{t('title')}</span>}
          {!isLoading && isStarted && !error && (
            <span className="text-xl font-bold">{team?.name}</span>
          )}
        </div>
        {!isLoading && isStarted && !error && teammates?.length !== 0 && (
          <div className="flex w-full items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={shuffle}
              disabled={isDone || !isPristine || teammates.length <= 1}
            >
              <Shuffle />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRandom}
              disabled={isDone || getIsLastActive(teammates) || teammates.length <= 1}
            >
              <Dices />
            </Button>
            <CardView disabled={isDone || getIsLastActive(teammates)}>
              <Button variant="outline" size="icon" type="button">
                <Eye />
              </Button>
            </CardView>
          </div>
        )}
        <div className="flex w-full flex-col items-center gap-4">
          {(isLoading || !isStarted) && !error && SkeletonCards}
          {error && <HoverEffectError />}
          {!isLoading && isStarted && !error && teammates?.length === 0 && (
            <HoverEffectNotFound title={t('noTeammates')}>
              <Button className="group" variant="secondary" asChild>
                <Link href="/teams">
                  {t('teamsButton')}
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </HoverEffectNotFound>
          )}
          {!isLoading && isStarted && !error && teammates?.length !== 0 && (
            <Suspense fallback={SkeletonCards}>{sm ? DesktopCards : MobileCards}</Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyncLiveGrid;
