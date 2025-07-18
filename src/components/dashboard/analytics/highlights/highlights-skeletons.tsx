import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { getHighlightsSizes } from '@/utils/getHighlightsSizes';

const HighlightsSkeletons = ({ columns, className }: { columns: number; className?: string }) => {
  return (
    <ul className="hover-effect-grid-highlights">
      {Array.from({ length: columns }).map((_, i) => {
        const { scale80, scale90, right, left } = getHighlightsSizes(columns, i);

        return (
          <li className={`relative w-1/3 sm:w-1/5 ${scale80} ${scale90} ${right} ${left}`} key={i}>
            <Skeleton className={cn('max-w-full rounded-xl', className)} />
          </li>
        );
      })}
    </ul>
  );
};

export default HighlightsSkeletons;
