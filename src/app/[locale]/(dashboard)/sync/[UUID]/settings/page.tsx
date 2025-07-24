import { Metadata } from 'next';
import SyncSettingsHero from '@/components/dashboard/sync/settings/hero';
import SyncSettingsGrid from '@/components/dashboard/sync/settings/grid';

const pagedata = {
  title: 'Sync Settings',
  description:
    'Configure team data synchronization parameters. Configure who will participate in the daily sync and set their order.',
  keywords: 'sync settings, synchronization, parameters, updates, configuration',
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
      <SyncSettingsHero />
      <SyncSettingsGrid />
    </>
  );
}
