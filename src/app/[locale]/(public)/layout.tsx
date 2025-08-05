import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import PublicFooter from '@/components/footer';
import PublicNavbar from '@/components/navbar-adaptive';
import Feedback from '@/components/dx/feedback/modal';
import Sonner from '@/components/sonner';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <PublicNavbar />
      {children}
      <Sonner />
      <Feedback />
      <PublicFooter />
    </ReactQueryProvider>
  );
}
