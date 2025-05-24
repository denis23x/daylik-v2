import { Toaster } from 'sonner';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <Toaster richColors />
      {children}
    </ReactQueryProvider>
  );
}
