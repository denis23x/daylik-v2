import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import GuidesFooter from '@/components/footer';
import GuidesNavbar from '@/components/navbar-adaptive';
import Sonner from '@/components/sonner';
import Feedback from '@/components/dashboard/modals/feedback/modal';

export default async function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <GuidesNavbar />
      {children}
      <Sonner />
      <Feedback />
      <GuidesFooter />
    </ReactQueryProvider>
  );
}
