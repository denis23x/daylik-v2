'use client';

import { Suspense } from 'react';
import AnalyticsGrid from './grid';

const AnalyticsGridSuspense = () => {
  return (
    <Suspense>
      <AnalyticsGrid />
    </Suspense>
  );
};

export default AnalyticsGridSuspense;
