import TeamsHero from '@/components/dashboard/teams/hero';
import TeamsList from '@/components/dashboard/teams/list';
import TeamsUpsert from '@/components/dashboard/teams/upsert';

export default function Teams() {
  return (
    <>
      <TeamsHero />
      <TeamsList />
      <TeamsUpsert />
    </>
  );
}
