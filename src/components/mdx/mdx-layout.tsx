import { ReactNode } from 'react';
import MdxScroll from '@/components/mdx/mdx-scroll';

export default function MdxLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-4">
      <MdxScroll />
      <div className="prose max-w-full">{children}</div>
    </div>
  );
}
