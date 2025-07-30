import DashboardNavbar from '@/components/dashboard/navbar';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import DashboardFooter from '@/components/footer';
import Sonner from '@/components/sonner';
import Feedback from '@/components/dashboard/modals/feedback/modal';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <DashboardNavbar />
      {children}
      <Sonner />
      <Feedback />
      <DashboardFooter />
    </ReactQueryProvider>
  );
}
