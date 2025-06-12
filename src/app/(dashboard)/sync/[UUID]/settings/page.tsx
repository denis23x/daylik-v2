import SyncSettingsHero from '@/components/dashboard/sync/settings/hero';
import SyncSettingsGrid from '@/components/dashboard/sync/settings/grid';

export default async function SyncPage() {
  return (
    <>
      <SyncSettingsHero />
      <SyncSettingsGrid />
    </>
  );
}
