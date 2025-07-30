import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import Sonner from '@/components/sonner';
import Feedback from '@/components/dashboard/modals/feedback/modal';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Sonner />
      <Feedback />
    </ReactQueryProvider>
  );
}
