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

export const BtnBulletList = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <List className="size-4" />, 'insertUnorderedList');
  return <ButtonComponent {...props} />;
};

export const BtnClearFormatting = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <BrushCleaning className="size-4" />, 'removeFormat');
  return <ButtonComponent {...props} />;
};

export const BtnItalic = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Italic className="size-4" />, 'italic');
  return <ButtonComponent {...props} />;
};

export const BtnLink = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Link className="size-4" />, ({ $selection }) => {
    if ($selection?.nodeName === 'A') {
      document.execCommand('unlink');
    } else {
      document.execCommand('createLink', false, prompt('URL', '') || undefined);
    }
  });
  return <ButtonComponent {...props} />;
};

export const BtnNumberedList = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(
    title,
    <ListOrdered className="size-4" />,
    'insertOrderedList'
  );
  return <ButtonComponent {...props} />;
};

export const BtnStrikeThrough = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(
    title,
    <Strikethrough className="size-4" />,
    'strikeThrough'
  );
  return <ButtonComponent {...props} />;
};

export const BtnUnderline = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Underline className="size-4" />, 'underline');
  return <ButtonComponent {...props} />;
};

export const BtnUndo = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Undo2 className="size-4" />, 'undo');
  return <ButtonComponent {...props} />;
};

export const BtnRedo = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Redo2 className="size-4" />, 'redo');
  return <ButtonComponent {...props} />;
};

export const BtnQuote = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Quote className="size-4" />, () => {
    document.execCommand('formatBlock', false, 'blockquote');
  });
  return <ButtonComponent {...props} />;
};

export const BtnHighlight = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Highlighter className="size-4" />, () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const destructiveColor = rootStyles.getPropertyValue('--destructive');
    document.execCommand('hiliteColor', false, destructiveColor);
  });
  return <ButtonComponent {...props} />;
};

export const BtnHorizontalRule = ({
  title,
  ...props
}: { title: string } & React.HTMLAttributes<HTMLButtonElement>) => {
  const ButtonComponent = createButton(title, <Minus className="size-4" />, () => {
    document.execCommand('insertHorizontalRule');
  });
  return <ButtonComponent {...props} />;
};
