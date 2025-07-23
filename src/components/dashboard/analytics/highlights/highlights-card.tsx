import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import AvatarInitials from '@/components/avatar-initials';
import { formatDuration } from '@/utils/formatDuration';
import type { AnalyticsHighlight } from '@/types/analyticsHighlight.type';
import { UserRound } from 'lucide-react';

const HighlightsCard = ({ highlight }: { highlight: AnalyticsHighlight }) => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="relative size-full gap-0 p-2">
        <CardHeader className="relative gap-0">
          <div className="absolute top-0 right-0 z-10 rounded-full">
            <span
              className={`flex size-4.5 items-center justify-center md:size-6 lg:size-7 xl:size-8 ${highlight.placeholder ? '[&_svg]:text-border' : ''}`}
            >
              {highlight.icon}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-2.5 md:p-3">
          <Avatar
            className={`aspect-square size-full translate-y-0.5 border ${!highlight.placeholder ? 'animate-shine' : 'border-dashed p-1'}`}
          >
            <AvatarImage
              className="bg-secondary object-cover"
              src={highlight.teammate?.avatar || undefined}
            />
            <AvatarFallback style={{ backgroundColor: highlight.teammate?.color }}>
              {highlight.placeholder ? (
                <UserRound className="size-4 sm:size-5" />
              ) : (
                <AvatarInitials className="text-2xl" teammate={highlight.teammate!} />
              )}
            </AvatarFallback>
          </Avatar>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch p-0 text-center">
          <span className="truncate text-sm font-semibold sm:text-lg md:text-2xl">
            {highlight.teammate?.name}
          </span>
          <p className="text-muted-foreground truncate text-xs sm:text-sm">
            {highlight.teammate?.role}
          </p>
        </CardFooter>
      </Card>
      {!highlight.placeholder && (
        <div className="bg-card flex flex-col items-center gap-2 rounded-lg border p-2 lg:flex-row">
          <div className="flex flex-1 flex-col overflow-hidden text-center">
            <span className="truncate text-sm font-semibold md:text-base">{highlight.label}</span>
            <span className="text-muted-foreground scale-90 truncate text-xs sm:scale-100">
              {highlight.key === 'edgerunner' && `Overtime x${highlight.overtime}`}
              {highlight.key === 'radio-tower' && `On Air ${formatDuration(highlight.total)}`}
              {highlight.key === 'frozen-hero' && `Paused time ${formatDuration(highlight.paused)}`}
              {highlight.key === 'mystery-ghost' && `Gone in ${formatDuration(highlight.total)}`}
              {highlight.key === 'limit-master' && `Wrapped in ${formatDuration(highlight.total)}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightsCard;
