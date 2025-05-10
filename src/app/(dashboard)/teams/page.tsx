import TeamsHero from '@/components/dashboard/teams/hero';
import TeamsList from '@/components/dashboard/teams/list';
import { createClient } from '@/utils/supabase/server';

export default async function Teams() {
  const supabase = await createClient();
  const { data: teams } = await supabase.from('team').select('*');

  return (
    <>
      <TeamsHero />
      <TeamsList teams={teams ?? []} />
    </>
  );
}
