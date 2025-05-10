import DashboardNavbar from '@/components/dashboard/navbar';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNavbar />
      <DotPattern className={cn('[opacity:0.5]')} />
      {children}
    </>
  );
}
