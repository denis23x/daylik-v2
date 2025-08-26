'use client';

import { Suspense } from 'react';
import PokerDock from './dock';

const PokerDockSuspense = () => {
  return (
    <Suspense>
      <PokerDock />
    </Suspense>
  );
};

export default PokerDockSuspense;
