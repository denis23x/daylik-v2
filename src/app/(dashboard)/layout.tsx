import DashboardNavbar from '@/components/dashboard/navbar';
import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <Toaster richColors />
      <DashboardNavbar />
      {children}
    </ReactQueryProvider>
  );
}
