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
      <div className="flex w-full flex-col gap-2 text-sm">
        <div className="flex items-end justify-between gap-4">
          <div className="flex h-6 items-center gap-2">
            <MapPin />
            <Badge variant="outline" className="text-md">
              {format(new Date(analytics.startedAt), 'HH:mm')}
            </Badge>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="self-center">
              <span className="text-muted-foreground text-sm">
                {format(new Date(analytics.createdAt), 'MMMM dd')}
              </span>
              <span className="text-foreground px-4 text-xl font-bold">{analytics.team?.name}</span>
              <span className="text-muted-foreground text-sm">
                {formatDuration(new Date(analytics.startedAt), new Date(analytics.finishedAt))}
              </span>
            </div>
            <span className="flex h-6 items-center">
              <Separator />
            </span>
          </div>
          <div className="flex h-6 items-center gap-2">
            <Badge variant="outline" className="text-md">
              {format(new Date(analytics.finishedAt), 'HH:mm')}
            </Badge>
            <Flag />
          </div>
        </div>
      </div>
    )
  );
};

export default AnalyticsSummary;
