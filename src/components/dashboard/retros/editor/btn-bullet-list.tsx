import { List } from 'lucide-react';
import { createButton } from 'react-simple-wysiwyg';

export const BtnBulletList = createButton(
  'Bullet list',
  <List className="size-4" />,
  'insertUnorderedList'
);
