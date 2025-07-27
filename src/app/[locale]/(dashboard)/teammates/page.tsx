import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/utils/pageProps.type';
import TeammatesHero from '@/components/dashboard/teammates/hero';
import TeammatesGrid from '@/components/dashboard/teammates/grid';
import TeammatesModal from '@/components/dashboard/teammates/modal-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'app.dashboard.teammates' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Teammates() {
  return (
    <>
      <TeammatesHero />
      <TeammatesGrid />
      <TeammatesModal />
    </>
  );
}
