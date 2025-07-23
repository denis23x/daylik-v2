import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import GuidesFooter from '@/components/footer';
import GuidesNavbar from '@/components/navbar-adaptive';

export default async function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <GuidesNavbar />
      {children}
      <GuidesFooter />
    </ReactQueryProvider>
  );
}
