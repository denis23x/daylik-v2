import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
