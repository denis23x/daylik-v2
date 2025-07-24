import { Metadata } from 'next';
import TeamsHero from '@/components/dashboard/teams/hero';
import TeamsGrid from '@/components/dashboard/teams/grid';
import TeamsModal from '@/components/dashboard/teams/modal-dynamic';

const pagedata = {
  title: 'Teams',
  description:
    'Manage, customize, and oversee your teams. Update team details, and manage teammates with ease.',
  keywords: 'teams, team management, create team, organization',
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

export default async function Teams() {
  return (
    <>
      <TeamsHero />
      <TeamsGrid />
      <TeamsModal />
    </>
  );
}
