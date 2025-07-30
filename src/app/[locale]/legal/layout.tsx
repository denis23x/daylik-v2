import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import LegalFooter from '@/components/footer';
import LegalNavbar from '@/components/navbar-adaptive';
import Feedback from '@/components/dashboard/modals/feedback/modal';
import Sonner from '@/components/sonner';

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <LegalNavbar />
      {children}
      <Sonner />
      <Feedback />
      <LegalFooter />
    </ReactQueryProvider>
  );
}
