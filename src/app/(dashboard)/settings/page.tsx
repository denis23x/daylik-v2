import SettingsHero from '@/components/dashboard/settings/hero';
import SettingsTabs from '@/components/dashboard/settings/tabs-suspense';

export default async function Settings() {
  return (
    <>
      <SettingsHero />
      <SettingsTabs />
    </>
  );
}
