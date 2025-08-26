'use client';

import PokerCards from './cards';
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
    <div className="flex h-screen w-screen flex-col items-center justify-between p-4">
      <div className="text-2xl font-bold">{poker?.name}</div>
      <div className="max-w-xl">{poker && <PokerCarousel />}</div>
      {poker && <PokerCards />}
    </div>
  );
};

export default PokerGrid;
