import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Testimonial from '@/components/testimonial';
import Pricing from '@/components/pricing';
import Footer from '@/components/footer';
import Stats from '@/components/stats';

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
