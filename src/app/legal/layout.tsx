import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Navbar />
      {children}
      <Footer />
    </ReactQueryProvider>
  );
}
