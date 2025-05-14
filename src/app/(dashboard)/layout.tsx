import DashboardNavbar from '@/components/dashboard/navbar';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContextProvider';
import { createClient } from '@/utils/supabase/server';
import ReactQueryProvider from '@/context/ReactQueryProvider';

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <AuthProvider initialUser={data.user}>
      <Toaster richColors />
      <ReactQueryProvider>
        <DashboardNavbar />
        {children}
      </ReactQueryProvider>
    </AuthProvider>

    // <QueryClientProvider client={queryClient}>
    //   <Toaster richColors />
    //   <DashboardNavbar />
    //   {children}
    // </QueryClientProvider>
  );
}
