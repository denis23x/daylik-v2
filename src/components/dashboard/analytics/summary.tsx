import { MapPin, Flag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { formatDuration } from '@/utils/formatDuration';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { Badge } from '@/components/ui/badge';

const AnalyticsSummary = () => {
  const { analytics } = useAnalyticsStore();

  return (
    analytics && (
      <div className="flex w-full flex-col gap-4 sm:gap-2">
        <div className="self-center">
          <time className="text-muted-foreground text-sm">
            {format(new Date(analytics.createdAt), 'MMMM dd')}
          </time>
          <span className="text-foreground px-4 text-xl font-bold">{analytics.team?.name}</span>
          <time className="text-muted-foreground text-sm">
            {formatDuration(new Date(analytics.startedAt), new Date(analytics.finishedAt))}
          </time>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex h-6 items-center gap-2">
            <MapPin />
            <Badge variant="outline">{format(new Date(analytics.startedAt), 'HH:mm')}</Badge>
          </div>
          <span className="flex h-6 w-full items-center">
            <Separator />
          </span>
          <div className="flex h-6 items-center gap-2">
            <Badge variant="outline">{format(new Date(analytics.finishedAt), 'HH:mm')}</Badge>
            <Flag />
          </div>
        </div>
      </div>
    )
  );
};

export default AnalyticsSummary;
