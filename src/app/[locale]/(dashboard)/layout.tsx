import DashboardNavbar from '@/components/dashboard/navbar';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import DashboardFooter from '@/components/footer';
import Sonner from '@/components/sonner';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <DashboardNavbar />
      {children}
      <Sonner />
      <DashboardFooter />
    </ReactQueryProvider>
  );
}
