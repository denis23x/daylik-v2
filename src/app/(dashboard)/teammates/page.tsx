import TeammatesHero from '@/components/dashboard/teammates/hero';
import TeammatesGrid from '@/components/dashboard/teammates/grid';
import TeammatesUpsert from '@/components/dashboard/teammates/upsert';

export default async function Teammates() {
  return (
    <>
      <TeammatesHero />
      <TeammatesGrid />
      <TeammatesUpsert />
    </>
  );
}
