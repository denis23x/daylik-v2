import { createButton } from 'react-simple-wysiwyg';
import { Link } from 'lucide-react';

export const BtnLink = createButton('Link', <Link className="size-4" />, ({ $selection }) => {
  if ($selection?.nodeName === 'A') {
    document.execCommand('unlink');
  } else {
    // eslint-disable-next-line no-alert
    document.execCommand('createLink', false, prompt('URL', '') || undefined);
  }
});
