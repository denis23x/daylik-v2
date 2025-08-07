import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/utils/pageProps.type';
import RetroDock from '@/components/dashboard/retros/dock/dock-suspense';
import RetroWordcloud from '@/components/dashboard/retros/wordcloud/wordcloud-dynamic';
import RetroModal from '@/components/dashboard/retros/modal-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'app.dashboard.retro' });

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

export default async function RetroPage() {
  return (
    <>
      <RetroWordcloud />
      <RetroModal />
      <RetroDock />
    </>
  );
}
