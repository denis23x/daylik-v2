import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/utils/pageProps.type';
import AuthSignUp from '@/components/auth/signup';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'app.auth.signup' });

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

export default function Signup() {
  return <AuthSignUp />;
}
