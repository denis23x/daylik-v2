import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageProps } from '@/types/utils/pageProps.type';
import Navbar from '@/components/navbar';
import HomeHero from '@/components/home/hero';
import HomeFeatures from '@/components/home/features';
import HomeTestimonial from '@/components/home/testimonial';
import HomeStats from '@/components/home/stats';
import HomePricing from '@/components/home/pricing';
import Footer from '@/components/footer';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'app.home' });

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
      index: true,
      follow: true,
    },
  };
}

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <HomeFeatures />
      <HomeStats />
      <HomeTestimonial />
      <HomePricing />
      <Footer />
    </>
  );
}
