import DashboardNavbar from '@/components/dashboard/navbar';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthProvider';
import { createClient } from '@/utils/supabase/server';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <ReactQueryProvider>
      <AuthProvider initialUser={data.user}>
        <Toaster richColors />
        <DashboardNavbar />
        {children}
      </AuthProvider>
    </ReactQueryProvider>
  );
}
