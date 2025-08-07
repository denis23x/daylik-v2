'use client';

import { Suspense } from 'react';
import RetrosDock from './dock';

const RetrosDockSuspense = () => {
  return (
    <Suspense>
      <RetrosDock />
    </Suspense>
  );
};

export default RetrosDockSuspense;
