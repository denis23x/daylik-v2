import { Metadata } from 'next';
import TeammatesHero from '@/components/dashboard/teammates/hero';
import TeammatesGrid from '@/components/dashboard/teammates/grid';
import TeammatesModal from '@/components/dashboard/teammates/modal-dynamic';

const pagedata = {
  title: 'Teammates',
  description:
    'Manage your teammates. Add new teammates, edit information and track their activity.',
  keywords: 'teammates, team members, team management, employees',
};

export const metadata: Metadata = {
  title: pagedata.title,
  description: pagedata.description,
  keywords: pagedata.keywords,
  openGraph: {
    title: pagedata.title,
    description: pagedata.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: pagedata.title,
    description: pagedata.description,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Teammates() {
  return (
    <>
      <TeammatesHero />
      <TeammatesGrid />
      <TeammatesModal />
    </>
  );
}
