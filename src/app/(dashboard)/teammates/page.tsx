import TeammatesHero from '@/components/dashboard/teammates/hero';
import TeammatesGrid from '@/components/dashboard/teammates/grid';
import TeammatesModal from '@/components/dashboard/teammates/modal';

export default async function Teammates() {
  return (
    <>
      <TeammatesHero />
      <TeammatesGrid />
      <TeammatesModal />
    </>
  );
}
