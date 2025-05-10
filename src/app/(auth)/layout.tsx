import Navbar from '@/components/navbar';
import { Toaster } from 'sonner';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster richColors />
      <Navbar />
      {children}
    </>
  );
}
