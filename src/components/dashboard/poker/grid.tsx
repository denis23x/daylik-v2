'use client';

import { usePokerByUUID } from '@/hooks/usePoker';
import { usePokerStore } from '@/store/usePokerStore';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import PokerCarousel from './carousel';
import PokerCards from './cards';
import PokerDock from './dock/dock';

const PokerGrid = () => {
  const params = useParams();
  const { poker, setPoker } = usePokerStore();
  const { data } = usePokerByUUID({
    query: '*',
    UUID: params.UUID as string,
  });

  useEffect(() => {
    if (data) {
      setPoker(data);
    }
  }, [data, setPoker]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-between p-4">
      <div className="text-2xl font-bold">{poker?.name}</div>
      <div className="max-w-xl">{poker && <PokerCarousel />}</div>
      {poker && <PokerCards />}
      <PokerDock />
    </div>
  );
};

export default PokerGrid;
