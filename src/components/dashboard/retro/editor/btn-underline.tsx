import { Underline } from 'lucide-react';
import { createButton } from 'react-simple-wysiwyg';

export const BtnUnderline = createButton(
  'Underline',
  <Underline className="size-4" />,
  'underline'
);
