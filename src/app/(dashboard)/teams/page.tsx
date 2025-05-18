import TeamsHero from '@/components/dashboard/teams/hero';
import TeamsGrid from '@/components/dashboard/teams/grid';
import TeamsUpsert from '@/components/dashboard/teams/upsert';

export default async function Teams() {
  return (
    <>
      <TeamsHero />
      <TeamsGrid />
      <TeamsUpsert />
    </>
  );
}
