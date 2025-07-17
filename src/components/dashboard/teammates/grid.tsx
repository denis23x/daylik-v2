'use client';

import type { Teammate } from '@/types/teammate.type';
import { useTeammates } from '@/hooks/useTeammates';
import { useTeammatesStore } from '@/store/useTeammatesStore';
import { Plus, UsersRound } from 'lucide-react';
import { lazy, Suspense, useEffect } from 'react';
import { getCookie, setCookie } from '@/hooks/useCookie';
import { COOKIE_CONSENT, COOKIE_ROLES } from '@/lib/constants';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import HoverEffectSkeletons from '@/components/dx/hover-effect/hover-effect-skeletons';
import HoverEffectError from '@/components/dx/hover-effect/hover-effect-error';
import HoverEffectNotFound from '@/components/dx/hover-effect/hover-effect-not-found';
import { Button } from '@/components/ui/button';

// Mobile optimization
const HoverEffect = lazy(() => import('@/components/dx/hover-effect/hover-effect'));
const TeammatesCardNew = lazy(() => import('./card-new'));
const TeammatesCard = lazy(() => import('./card'));

const TeammatesGrid = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const { openModal } = useTeammatesStore();
  const { data: teammates, error, isLoading } = useTeammates({ query: '*' });

  useEffect(() => {
    if (teammates) {
      const roles = Array.from(new Set(teammates?.map((teammate) => teammate.role)));

      // Save roles to cookie for autocomplete
      if (Number(getCookie(COOKIE_CONSENT))) {
        setCookie(COOKIE_ROLES, JSON.stringify(roles));
      }
    }
  }, [teammates]);

  const handleInsert = () => {
    openModal('insert');
  };

  const SkeletonCards = () => {
    return <HoverEffectSkeletons columns={4} className="aspect-[3/3.75] min-h-[224px]" />;
  };

  const DesktopCards = () => (
    <HoverEffect>
      <TeammatesCardNew />
      {teammates?.map((teammate: Teammate) => (
        <TeammatesCard key={teammate.UUID} teammate={teammate} />
      ))}
    </HoverEffect>
  );

  const MobileCards = () => (
    <div className="hover-effect-grid">
      <TeammatesCardNew />
      {teammates?.map((teammate: Teammate) => (
        <TeammatesCard key={teammate.UUID} teammate={teammate} />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <UsersRound />
          <span className="text-xl font-bold">Teammates</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && <SkeletonCards />}
          {error && <HoverEffectError />}
          {!isLoading && !error && teammates?.length === 0 && (
            <HoverEffectNotFound title="No teammates found">
              <Button variant="secondary" onClick={handleInsert}>
                <Plus /> Add Teammate
              </Button>
            </HoverEffectNotFound>
          )}
          {!isLoading && !error && teammates?.length !== 0 && (
            <Suspense fallback={<SkeletonCards />}>
              {sm ? <DesktopCards /> : <MobileCards />}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeammatesGrid;
