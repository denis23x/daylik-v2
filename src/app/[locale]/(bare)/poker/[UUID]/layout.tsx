import Sonner from '@/components/sonner';
import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default function PokerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Sonner />
    </ReactQueryProvider>
  );
}
