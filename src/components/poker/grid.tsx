'use client';

import Card from './card';
import { useState } from 'react';
import PokerCarousel from './carousel';

const fibonacci = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];

const PokerGrid = () => {
  const [fibonacciCards] = useState<(number | string)[]>(fibonacci);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <ul className="grid grid-cols-12 gap-4">
        {fibonacciCards.map((item) => (
          <li key={item}>
            <Card item={item} />
          </li>
        ))}
      </ul>
      <PokerCarousel />
      <ul className="grid grid-cols-12 gap-4">
        {fibonacciCards.map((item) => (
          <li key={item}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokerGrid;
