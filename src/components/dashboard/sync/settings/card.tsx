import React, { useMemo } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Move, Undo2, X } from 'lucide-react';
import AvatarInitials from '@/components/avatar-initials';
import type { Teammate } from '@/types/teammate.type';

interface SyncSettingsCardProps {
  teammate: Teammate;
  teammatesAbsent: string[];
  dispatch: React.Dispatch<{ type: 'add' | 'remove'; UUID: string }>;
  dragHandle?: {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners?: React.DOMAttributes<HTMLElement>;
  };
}

const SyncSettingsCard = ({
  teammate,
  teammatesAbsent,
  dispatch,
  dragHandle,
}: SyncSettingsCardProps) => {
  const isAbsent = useMemo(() => {
    return teammatesAbsent.includes(teammate.UUID);
  }, [teammatesAbsent, teammate.UUID]);

  return (
    <Card className="size-full gap-0 p-2">
      <CardHeader className="relative gap-0">
        {dragHandle && (
          <Button
            className="absolute top-0 left-0 z-10 cursor-move rounded-full"
            variant="secondary"
            size="icon"
            disabled={isAbsent}
            {...dragHandle.attributes}
            {...dragHandle.listeners}
          >
            <Move />
          </Button>
        )}
        {isAbsent ? (
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
          isAbsent ? 'opacity-25 grayscale' : ''
        }`}
      >
        <Avatar className="aspect-square size-full border">
          <AvatarImage className="bg-secondary object-cover" src={teammate.avatar || undefined} />
          <AvatarFallback style={{ backgroundColor: teammate.color }}>
            <AvatarInitials className="text-2xl" teammate={teammate} />
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter
        className={`flex flex-col items-stretch p-0 text-center transition-[opacity,filter] duration-200 ${
          isAbsent ? 'opacity-25 grayscale' : ''
        }`}
      >
        <span className="truncate text-lg font-semibold sm:text-2xl">{teammate.name}</span>
        <p className="text-muted-foreground truncate text-xs sm:text-sm">{teammate.role}</p>
      </CardFooter>
    </Card>
  );
};

export default SyncSettingsCard;
