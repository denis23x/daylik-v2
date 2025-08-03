'use client';

import { Suspense } from 'react';
import SettingsTabs from './tabs';

const SettingsTabsSuspense = () => {
  return (
    <Suspense>
      <SettingsTabs />
    </Suspense>
  );
};

export default SettingsTabsSuspense;
