import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import Sonner from '@/components/sonner';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Sonner />
    </ReactQueryProvider>
  );
}
