import { BrushCleaning } from 'lucide-react';
import { createButton } from 'react-simple-wysiwyg';

export const BtnClearFormatting = createButton(
  'Clear formatting',
  <BrushCleaning className="size-4" />,
  'removeFormat'
);
