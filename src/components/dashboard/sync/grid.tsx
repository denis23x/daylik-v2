'use client';

import SyncGridSettings from '@/components/dashboard/sync/grid-settings';
import SyncGridLive from '@/components/dashboard/sync/grid-live';

const SyncGrid = () => {
  return (
    <>
      <SyncGridSettings />
      <SyncGridLive />
    </>
  );
};

export default SyncGrid;
