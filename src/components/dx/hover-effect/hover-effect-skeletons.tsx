import { cn } from '@/lib/utils';
import { Skeleton } from '../../ui/skeleton';

const HoverEffectSkeletons = ({ columns, className }: { columns: number; className?: string }) => {
  return (
    <ul className="hover-effect-grid">
      {Array.from({ length: columns }).map((_, index) => (
        <li key={index}>
          <Skeleton className={cn('max-w-full rounded-xl', className)} />
        </li>
      ))}
    </ul>
  );
};

export default HoverEffectSkeletons;
