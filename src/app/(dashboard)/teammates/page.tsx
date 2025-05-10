// import TeammatesHero from '@/components/dashboard/teammates/hero';
import TeammatesList from '@/components/dashboard/teammates/list';
import { createClient } from '@/utils/supabase/server';

export default async function Teammates() {
  const supabase = await createClient();
  const { data: teammates } = await supabase.from('teammate').select('*');

  return (
    <div className="relative">
      {/* <TeammatesHero /> */}
      <TeammatesList teammates={teammates ?? []} />
    </div>
  );
}
