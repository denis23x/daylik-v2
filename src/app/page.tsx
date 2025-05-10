import Navbar from '@/components/navbar/navbar';
import Hero from '@/components/hero';
import Features from '@/components/features';
import Testimonial from '@/components/testimonial';
import Pricing from '@/components/pricing';
export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <Pricing />
    </div>
  );
}
