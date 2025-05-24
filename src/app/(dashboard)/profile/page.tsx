import ProfileHero from '@/components/dashboard/profile/hero';
import ProfileTabs from '@/components/dashboard/profile/tabs-suspense';

export default async function Profile() {
  return (
    <>
      <ProfileHero />
      <ProfileTabs />
    </>
  );
}
