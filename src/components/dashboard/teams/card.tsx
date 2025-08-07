import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pencil, UserRoundPlus } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import AvatarInitials from '@/components/avatar-initials';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import { getDisplayTeammates } from '@/utils/getDisplayTeammates';
import { toast } from 'sonner';
import { useTeammatesFromTeam } from '@/hooks/useTeamsTeammates';
import { useTeamsStore } from '@/store/useTeamsStore';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const TeamsCard = ({ team }: { team: Team }) => {
  const t = useTranslations('components.dashboard.teams.card');
  const { openModal } = useTeamsStore();
  const { refetch } = useTeammatesFromTeam({
    query: 'teammateUUID',
    UUID: team?.UUID || '',
  });

  const handleUpdate = async (team: Team) => {
    try {
      const teammatesFromTeam = await refetch();
      const teammates = teammatesFromTeam.data || [];

      // Open modal with teammates
      openModal('update', {
        ...team,
        teammates: teammates.map(({ teammateUUID }) => teammateUUID),
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('messages.error'));
    }
  };

  return (
    <Card className="size-full gap-0 p-2" id={team.UUID}>
      <CardHeader className="relative mb-auto flex min-h-9 items-center justify-between gap-x-1.5 gap-y-0 p-0">
        <span className="truncate text-base font-semibold">{team.name}</span>
        <Button
          className="self-end rounded-full"
          variant="secondary"
          size="icon"
          onClick={() => handleUpdate(team)}
        >
          <Pencil />
        </Button>
      </CardHeader>
      <CardContent
        className={`my-2 ${team.teammates?.length || team.image ? 'p-0' : 'p-4 sm:p-3'}`}
      >
        {team.image ? (
          <Image
            className="aspect-square size-full rounded-lg border object-cover"
            src={team.image}
            alt={team.name}
            width={256}
            height={256}
          />
        ) : team.teammates?.length ? (
          <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-lg">
            {(getDisplayTeammates(team) as Teammate[]).map(
              (teammate: Teammate, index, array) =>
                index < 4 && (
                  <Avatar className="aspect-square size-full rounded-lg border" key={teammate.UUID}>
                    {index < 3 && (
                      <AvatarImage
                        className="bg-secondary object-cover"
                        src={teammate.avatar || undefined}
                      />
                    )}
                    {index !== 3 && teammate.color && teammate.name ? (
                      <AvatarFallback
                        className="rounded-lg"
                        style={{ backgroundColor: teammate.color }}
                      >
                        <AvatarInitials className="lg:text-lg" teammate={teammate} />
                      </AvatarFallback>
                    ) : teammate.color && teammate.name ? (
                      <AvatarFallback className="rounded-lg">
                        <span className="text-lg">+{array.length - 3}</span>
                      </AvatarFallback>
                    ) : (
                      <AvatarFallback className="rounded-lg" asChild>
                        <Button variant="secondary" size="icon" onClick={() => handleUpdate(team)}>
                          <UserRoundPlus className="size-4.5" />
                        </Button>
                      </AvatarFallback>
                    )}
                  </Avatar>
                )
            )}
          </div>
        ) : (
          <Avatar className="aspect-square size-full border border-dashed p-1">
            <AvatarFallback asChild>
              <Button variant="secondary" onClick={() => handleUpdate(team)}>
                <UserRoundPlus className="size-5" />
              </Button>
            </AvatarFallback>
          </Avatar>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-stretch p-0 text-center">
        {team.teammates?.length ? (
          <Link
            className={cn(buttonVariants({ variant: 'default' }))}
            href={{
              pathname: '/sync/[UUID]/settings',
              params: { UUID: team.UUID },
            }}
          >
            {t('sync')}
          </Link>
        ) : (
          <Button variant="secondary" onClick={() => handleUpdate(team)}>
            {t('addTeammates')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TeamsCard;
