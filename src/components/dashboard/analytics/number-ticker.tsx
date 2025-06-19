import { useRef } from 'react';
import { NumberTicker as MagicNumberTicker } from '../../magicui/number-ticker';
import { cn } from '@/lib/utils';
import { getSeconds } from '@/utils/getSeconds';

const NumberTicker = ({ total, className }: { total: number; className?: string }) => {
  const seconds = useRef(getSeconds(total));
  const minutes = useRef(Math.floor(seconds.current / 60));

  return (
    <div className={cn('text-current', className)}>
      {minutes.current > 0 && (
        <>
          <MagicNumberTicker className="text-current" value={minutes.current} />m
        </>
      )}
      <MagicNumberTicker className="text-current" value={seconds.current} />s
    </div>
  );
};

export default NumberTicker;
