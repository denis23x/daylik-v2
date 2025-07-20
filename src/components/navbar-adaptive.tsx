import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/navbar';
import DashboardNavbar from '@/components/dashboard/navbar';

export default async function AdaptiveNavbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is authenticated, show DashboardNavbar
  if (user) {
    return <DashboardNavbar />;
  }

  // If user is not authenticated, show regular Navbar
  return <Navbar />;
}
