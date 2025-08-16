import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import Sonner from '@/components/sonner';

export default function MessagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Sonner />
    </ReactQueryProvider>
  );
}
