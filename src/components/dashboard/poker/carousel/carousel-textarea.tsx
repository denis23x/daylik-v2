'use client';

import { textareaVariants } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const PokerCarouselTextarea = ({ text }: { text: string }) => {
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    // Remove formatting from pasted text
    document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
  };

  const handleInput = (e: React.ChangeEvent<HTMLDivElement>) => {
    const newContent = e.target.innerHTML;
    console.log(newContent);
  };

  return (
    <div
      contentEditable
      className={cn(
        textareaVariants({ variant: 'default' }),
        'flex min-h-48 flex-col items-center justify-center text-center !text-3xl'
      )}
      dangerouslySetInnerHTML={{ __html: text }}
      onInput={handleInput}
      onPaste={handlePaste}
    ></div>
  );
};

export default PokerCarouselTextarea;
