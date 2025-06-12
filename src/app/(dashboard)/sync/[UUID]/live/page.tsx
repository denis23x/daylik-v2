import SyncLiveHero from '@/components/dashboard/sync/live/hero';
import SyncLiveGrid from '@/components/dashboard/sync/live/grid';

export default async function SyncPage() {
  return (
    <>
      <SyncLiveHero />
      <SyncLiveGrid />
    </>
  );
}
