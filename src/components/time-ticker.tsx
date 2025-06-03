import { useRef } from 'react';
import { NumberTicker } from './magicui/number-ticker';

const TimeTicker = ({ total, timer }: { total: number; timer: number }) => {
  const minutes = useRef(Math.floor(total / 60));
  const seconds = useRef(total % 60);

  return (
    <div className={`${timer > total ? 'text-emerald-500' : 'text-red-500'}`}>
      <NumberTicker className="text-current" value={minutes.current} />m{' '}
      <NumberTicker className="text-current" value={seconds.current} />s
    </div>
  );
};

export default TimeTicker;
