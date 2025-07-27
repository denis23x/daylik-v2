import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/utils/pageProps.type';
import AuthLogin from '@/components/auth/login';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'app.auth.login' });

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

export default function Login() {
  return <AuthLogin />;
}
