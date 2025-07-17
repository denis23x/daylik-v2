'use client';

import { useTeams } from '@/hooks/useTeams';
import { useTeamsStore } from '@/store/useTeamsStore';
import type { Team } from '@/types/team.type';
import { Grid2x2, Plus } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { useMediaQuery } from '@/hooks/ui/useMediaQuery';
import HoverEffectSkeletons from '@/components/dx/hover-effect/hover-effect-skeletons';
import HoverEffectError from '@/components/dx/hover-effect/hover-effect-error';
import HoverEffectNotFound from '@/components/dx/hover-effect/hover-effect-not-found';
import { Button } from '@/components/ui/button';

// Mobile optimization
const HoverEffect = lazy(() => import('@/components/dx/hover-effect/hover-effect'));
const TeamsCardNew = lazy(() => import('./card-new'));
const TeamsCard = lazy(() => import('./card'));

const TeamsGrid = () => {
  const sm = useMediaQuery('(min-width: 640px)');
  const { openModal } = useTeamsStore();
  const {
    data: teams,
    error,
    isLoading,
  } = useTeams({
    query: `*, teams_teammates (order, teammates (UUID, name, color, avatar))`,
  });

  const handleInsert = () => {
    openModal('insert');
  };

  const SkeletonCards = () => {
    return <HoverEffectSkeletons columns={4} className="aspect-[2/2.75] min-h-[224px]" />;
  };

  const DesktopCards = () => (
    <HoverEffect>
      <TeamsCardNew />
      {teams?.map((team: Team) => <TeamsCard key={team.UUID} team={team} />)}
    </HoverEffect>
  );

  const MobileCards = () => (
    <div className="hover-effect-grid">
      <TeamsCardNew />
      {teams?.map((team: Team) => <TeamsCard key={team.UUID} team={team} />)}
    </div>
  );

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Grid2x2 />
          <span className="text-xl font-bold">Teams</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          {isLoading && <SkeletonCards />}
          {error && <HoverEffectError />}
          {!isLoading && !error && teams?.length === 0 && (
            <HoverEffectNotFound title="No teams found">
              <Button variant="secondary" onClick={handleInsert}>
                <Plus /> Create Team
              </Button>
            </HoverEffectNotFound>
          )}
          {!isLoading && !error && teams?.length !== 0 && (
            <Suspense fallback={<SkeletonCards />}>
              {sm ? <DesktopCards /> : <MobileCards />}
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamsGrid;
