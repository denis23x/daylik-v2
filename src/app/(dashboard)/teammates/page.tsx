import TeammatesHero from '@/components/dashboard/teammates/hero';
import TeammatesList from '@/components/dashboard/teammates/list';
import TeammatesUpsert from '@/components/dashboard/teammates/upsert';

export default async function Teammates() {
  return (
    <>
      <TeammatesHero />
      <TeammatesList />
      <TeammatesUpsert />
    </>
  );
}
