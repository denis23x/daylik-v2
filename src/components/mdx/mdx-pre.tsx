'use client';

import { Check, Clipboard } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, RefObject, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from 'usehooks-ts';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

export default function MdxPre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const preRef: RefObject<HTMLPreElement | null> = useRef<HTMLPreElement | null>(null);
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const t = useTranslations('components.mdx.mdxPre');

  const handleClickCopy = () => {
    const code: string | null | undefined = preRef.current?.textContent;

    if (code) {
      toast.promise(copy?.(code), {
        success: t('messages.success'),
        error: (e: unknown) => (e instanceof Error ? e.message : t('messages.error')),
      });

      setIsCopied(true);

      // Reset copied state after 3 seconds
      setTimeout(() => setIsCopied(false), 3000);
    }
  };

  return (
    <div className="border-input rounded-md border">
      <Button
        variant="outline"
        size="icon"
        aria-label={t('copyAriaLabel')}
        onClick={handleClickCopy}
        className="absolute top-2 right-2 z-10"
      >
        {isCopied ? <Check /> : <Clipboard />}
      </Button>
      <pre ref={preRef} {...props} className="relative">
        {children}
      </pre>
    </div>
  );
}
