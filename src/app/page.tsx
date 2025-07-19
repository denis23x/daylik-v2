import { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Testimonial from '@/components/testimonial';
import Pricing from '@/components/pricing';
import Footer from '@/components/footer';
import Stats from '@/components/stats';

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
      <Hero />
      <Features />
      <Testimonial />
      <Stats />
      <Pricing />
      <Footer />
    </>
  );
}
