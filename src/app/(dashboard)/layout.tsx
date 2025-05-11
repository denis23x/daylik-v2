import DashboardNavbar from '@/components/dashboard/navbar';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster richColors />
      <DashboardNavbar />
      {children}
    </>
  );
}
