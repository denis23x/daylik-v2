import { Strikethrough } from 'lucide-react';
import { createButton } from 'react-simple-wysiwyg';

export const BtnStrikeThrough = createButton(
  'Strike through',
  <Strikethrough className="size-4" />,
  'strikeThrough'
);
