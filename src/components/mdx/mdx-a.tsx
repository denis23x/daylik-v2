'use client';

import { ArrowUpRight } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, RefObject, useRef } from 'react';
import Link from 'next/link';

export default function MdxA({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  const preRef: RefObject<HTMLAnchorElement | null> = useRef<HTMLAnchorElement | null>(null);

  // @ts-expect-error href is not exists
  const target = props.href.startsWith('http') ? '_blank' : '_self';

  return (
    // @ts-expect-error href is required
    <Link className="inline" ref={preRef} {...props} target={target}>
      <span className="inline-block max-w-full overflow-hidden align-bottom text-ellipsis underline">
        {children}
      </span>
      {target === '_blank' && (
        <ArrowUpRight className="inline-block size-4 min-w-4 align-baseline" />
      )}
    </Link>
  );
}
