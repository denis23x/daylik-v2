import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default function RetroLayout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
