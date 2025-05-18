import DashboardNavbar from '@/components/dashboard/navbar';
import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import { DashboardFooter } from '@/components/dashboard/footer';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Toaster richColors />
      <DashboardNavbar />
      {children}
      <DashboardFooter />
    </ReactQueryProvider>
  );
}
