import { createButton } from 'react-simple-wysiwyg';
import { ListOrdered } from 'lucide-react';

export const BtnNumberedList = createButton(
  'Numbered list',
  <ListOrdered className="size-4" />,
  'insertOrderedList'
);
