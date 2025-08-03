'use client';

import { Suspense } from 'react';
import RetroDock from './dock';

const RetroDockSuspense = () => {
  return (
    <Suspense>
      <RetroDock />
    </Suspense>
  );
};

export default RetroDockSuspense;
