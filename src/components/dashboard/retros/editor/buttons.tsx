import { Highlighter, List, Minus, Quote } from 'lucide-react';
import { createButton } from 'react-simple-wysiwyg';
import { Bold } from 'lucide-react';
import { BrushCleaning } from 'lucide-react';
import { Italic } from 'lucide-react';
import { Link } from 'lucide-react';
import { ListOrdered } from 'lucide-react';
import { Redo2 } from 'lucide-react';
import { Strikethrough } from 'lucide-react';
import { Underline } from 'lucide-react';
import { Undo2 } from 'lucide-react';

export const BtnBold = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Bold className="size-4" />, 'bold');
  return <ButtonComponent {...props} />;
};

export const BtnBulletList = createButton(
  'Bullet list',
  <List className="size-4" />,
  'insertUnorderedList'
);

export const BtnClearFormatting = createButton(
  'Clear formatting',
  <BrushCleaning className="size-4" />,
  'removeFormat'
);

export const BtnItalic = createButton('Italic', <Italic className="size-4" />, 'italic');

export const BtnLink = createButton('Link', <Link className="size-4" />, ({ $selection }) => {
  if ($selection?.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    document.execCommand('createLink', false, prompt('URL', '') || undefined);
  }
});

export const BtnNumberedList = createButton(
  'Numbered list',
  <ListOrdered className="size-4" />,
  'insertOrderedList'
);

export const BtnStrikeThrough = createButton(
  'Strike through',
  <Strikethrough className="size-4" />,
  'strikeThrough'
);

export const BtnUnderline = createButton(
  'Underline',
  <Underline className="size-4" />,
  'underline'
);

export const BtnUndo = createButton('Undo', <Undo2 className="size-4" />, 'undo');

export const BtnRedo = createButton('Redo', <Redo2 className="size-4" />, 'redo');

export const BtnQuote = createButton('Blockquote', <Quote className="size-4" />, () => {
  document.execCommand('formatBlock', false, 'blockquote');
});

export const BtnHighlight = createButton('Highlight', <Highlighter className="size-4" />, () => {
  const rootStyles = getComputedStyle(document.documentElement);
  const destructiveColor = rootStyles.getPropertyValue('--destructive');

  document.execCommand('hiliteColor', false, destructiveColor);
});

export const BtnHorizontalRule = createButton(
  'Horizontal rule',
  <Minus className="size-4" />,
  () => {
    document.execCommand('insertHorizontalRule');
  }
);
