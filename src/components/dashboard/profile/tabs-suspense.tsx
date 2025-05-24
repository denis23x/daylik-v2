'use client';

import { Suspense } from 'react';
import ProfileTabs from './tabs';

const ProfileTabsSuspense = () => {
  return (
    <Suspense>
      <ProfileTabs />
    </Suspense>
  );
};

export default ProfileTabsSuspense;
