'use client';

import { Suspense } from 'react';
import SettingsTabs from './tabs';

const ProfileTabsSuspense = () => {
  return (
    <Suspense>
      <SettingsTabs />
    </Suspense>
  );
};

export default ProfileTabsSuspense;
