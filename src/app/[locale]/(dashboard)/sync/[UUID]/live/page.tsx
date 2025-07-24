import { Metadata } from 'next';
import SyncLiveHero from '@/components/dashboard/sync/live/hero';
import SyncLiveGrid from '@/components/dashboard/sync/live/grid';

const pagedata = {
  title: 'Sync Live',
  description: 'Monitor team data synchronization in real-time. Track activity and updates.',
  keywords: 'synchronization, real-time, monitoring, team activity',
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

export default async function SyncPage() {
  return (
    <>
      <SyncLiveHero />
      <SyncLiveGrid />
    </>
  );
}
