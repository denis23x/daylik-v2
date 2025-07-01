import DashboardNavbar from '@/components/dashboard/navbar';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import { DashboardFooter } from '@/components/dashboard/footer';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <DashboardNavbar />
      {children}
      <DashboardFooter />
    </ReactQueryProvider>
  );
}
