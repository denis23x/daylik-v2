import TeamsHero from '@/components/dashboard/teams/hero';
import TeamsGrid from '@/components/dashboard/teams/grid';
import TeamsModal from '@/components/dashboard/teams/modal-dynamic';

export default async function Teams() {
  return (
    <>
      <TeamsHero />
      <TeamsGrid />
      <TeamsModal />
    </>
  );
}
