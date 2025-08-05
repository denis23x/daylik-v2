import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import Sonner from '@/components/sonner';
import Feedback from '@/components/dx/feedback/modal';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Sonner />
      <Feedback />
    </ReactQueryProvider>
  );
}
