import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/utils/pageProps.type';
import MdxLayout from '@/components/mdx/mdx-layout';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'app.legal.termsAndConditions' });

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

export default async function TermsAndConditionsPage({ params }: PageProps) {
  const { locale } = await params;

  try {
    const Mdx = (await import(`./${locale}.mdx`)).default;

    return (
      <MdxLayout>
        <Mdx />
      </MdxLayout>
    );
  } catch {
    notFound();
  }
}
