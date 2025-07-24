import { Metadata } from 'next';
import SettingsHero from '@/components/dashboard/settings/hero';
import SettingsTabs from '@/components/dashboard/settings/tabs-suspense';

const pagedata = {
  title: 'Settings',
  description:
    'Configure your account settings. Manage profile, security and other account preferences.',
  keywords: 'settings, profile, security, account, configuration',
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

export default async function Settings() {
  return (
    <>
      <SettingsHero />
      <SettingsTabs />
    </>
  );
}
