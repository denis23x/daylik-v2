import { Metadata } from 'next';
import Navbar from '@/components/navbar';
import HomeHero from '@/components/home/hero';
import HomeFeatures from '@/components/home/features';
import HomeTestimonial from '@/components/home/testimonial';
import HomeStats from '@/components/home/stats';
import Pricing from '@/components/home/pricing';
import Footer from '@/components/footer';

const pagedata = {
  title: 'Team Management and Analytics Platform',
  description:
    'Efficient team management platform with synchronization and performance analytics. Track progress, manage teammates, and analyze results.',
  keywords: 'team management, analytics, synchronization, performance, productivity',
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
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeHero />
      <HomeFeatures />
      <HomeTestimonial />
      <HomeStats />
      <Pricing />
      <Footer />
    </>
  );
}
