import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Pencil } from 'lucide-react';
import AvatarInitials from '@/components/avatar-initials';
import type { Teammate } from '@/types/teammate.type';
import { useTeamsToTeammate } from '@/hooks/useTeamsTeammates';
import { toast } from 'sonner';
import { useTeammatesStore } from '@/store/useTeammatesStore';

const TeammatesCard = ({ teammate }: { teammate: Teammate }) => {
  const { openModal } = useTeammatesStore();
  const { refetch } = useTeamsToTeammate({
    query: 'teamUUID',
    UUID: teammate?.UUID || '',
  });

  const handleUpdate = async (teammate: Teammate) => {
    try {
      const teamsFromTeammate = await refetch();
      const teams = teamsFromTeammate.data || [];

      // Open modal with teams
      openModal('update', {
        ...teammate,
        teams: teams.map(({ teamUUID }) => teamUUID),
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <Card className="size-full gap-0 p-2" id={teammate.UUID}>
      <CardHeader className="relative gap-0">
        <Button
          className="absolute top-0 right-0 z-10 rounded-full"
          variant="secondary"
          size="icon"
          onClick={() => handleUpdate(teammate)}
        >
          <Pencil />
        </Button>
      </CardHeader>
      <CardContent className="translate-y-2 p-4 sm:p-3">
        <Avatar
          className="aspect-square size-full cursor-pointer border"
          onClick={() => handleUpdate(teammate)}
        >
          <AvatarImage className="bg-secondary object-cover" src={teammate.avatar || undefined} />
          <AvatarFallback style={{ backgroundColor: teammate.color }}>
            <AvatarInitials className="text-2xl" teammate={teammate} />
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch p-0 text-center">
        <span className="truncate text-lg font-semibold sm:text-2xl">{teammate.name}</span>
        <p className="text-muted-foreground truncate text-xs sm:text-sm">{teammate.role}</p>
      </CardFooter>
    </Card>
  );
};

export default TeammatesCard;
