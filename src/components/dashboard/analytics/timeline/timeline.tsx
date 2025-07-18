import { MapPin, Flag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { formatDuration } from '@/utils/formatDuration';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { Badge } from '@/components/ui/badge';

const AnalyticsTimeline = () => {
  const { analytics } = useAnalyticsStore();

  return (
    analytics && (
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-6 items-center gap-2">
          <MapPin />
          <Badge variant="outline">{format(new Date(analytics.startedAt), 'HH:mm')}</Badge>
        </div>
        <span className="flex h-6 w-full items-center">
          <Separator />
        </span>
        <div className="flex h-6 items-center gap-2">
          <Badge>
            {formatDuration(new Date(analytics.startedAt), new Date(analytics.finishedAt))}
          </Badge>
        </div>
        <span className="flex h-6 w-full items-center">
          <Separator />
        </span>
        <div className="flex h-6 items-center gap-2">
          <Badge variant="outline">{format(new Date(analytics.finishedAt), 'HH:mm')}</Badge>
          <Flag />
        </div>
      </div>
    )
  );
};

export default AnalyticsTimeline;
