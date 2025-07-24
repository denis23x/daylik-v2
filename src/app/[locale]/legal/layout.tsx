import { ReactQueryProvider } from '@/context/ReactQueryProvider';
import LegalFooter from '@/components/footer';
import LegalNavbar from '@/components/navbar-adaptive';

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <LegalNavbar />
      {children}
      <LegalFooter />
    </ReactQueryProvider>
  );
}
