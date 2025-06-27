import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import Sonner from '@/components/sonner';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <Sonner />
      {children}
    </ReactQueryProvider>
  );
}
