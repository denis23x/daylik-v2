'use client';

import Card from './card';
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
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      {poker && (
        <ul className="grid grid-cols-12 gap-4">
          {poker.cards.map((item) => (
            <li key={item}>
              <Card item={item} />
            </li>
          ))}
        </ul>
      )}
      <PokerCarousel />
    </div>
  );
};

export default PokerGrid;
