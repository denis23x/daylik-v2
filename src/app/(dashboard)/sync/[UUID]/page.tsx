import SyncHero from '@/components/dashboard/sync/hero';
import SyncGrid from '@/components/dashboard/sync/grid';
import SyncModal from '@/components/dashboard/sync/modal-dynamic';

export default async function SyncPage() {
  return (
    <>
      <SyncHero />
      <SyncGrid />
      <SyncModal />
    </>
  );
}
