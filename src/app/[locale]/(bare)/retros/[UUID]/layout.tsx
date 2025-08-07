import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default function RetrosLayout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
