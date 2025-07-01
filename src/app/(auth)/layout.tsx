import { ReactQueryProvider } from '@/context/ReactQueryProvider';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
