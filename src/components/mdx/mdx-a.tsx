'use client';

import { ArrowUpRight } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, RefObject, useRef } from 'react';
import { Link } from '@/i18n/navigation';

export default function MdxA({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  const preRef: RefObject<HTMLAnchorElement | null> = useRef<HTMLAnchorElement | null>(null);

  // @ts-expect-error href is not exists
  const target = ['http', 'mailto', 'tel', 'sms'].find((scheme) => props.href.startsWith(scheme))
    ? '_blank'
    : '_self';

  return (
    // @ts-expect-error href is required
    <Link className="inline" ref={preRef} {...props} target={target}>
      <span className="inline wrap-anywhere underline">{children}</span>
      {target === '_blank' && <ArrowUpRight className="inline size-4 min-w-4 align-baseline" />}
    </Link>
  );
}
