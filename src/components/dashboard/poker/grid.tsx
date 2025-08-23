'use client';

import PokerCarousel from './carousel';
import { usePokerByUUID } from '@/hooks/usePoker';
import { useParams } from 'next/navigation';

const PokerGrid = () => {
  const params = useParams();
  const { data: poker } = usePokerByUUID({
    query: '*',
    UUID: params.UUID as string,
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="text-2xl font-bold">{poker?.name}</div>
      {poker && (
        <div className="flex w-full max-w-xl">
          <PokerCarousel />
        </div>
      )}
    </div>
  );
};

export default PokerGrid;
