import React from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { useEditorState } from './editor-context';
import { Type } from 'lucide-react';

const fontSizes = [
  ['xs', 1],
  ['sm', 2],
  ['base', 3],
  ['lg', 4],
  ['xl', 5],
  ['2xl', 6],
];

export const BtnFontSize = () => {
  const { $el } = useEditorState();

  const handleSelect = (size: string | number) => {
    if (document.activeElement !== $el) {
      $el?.focus();
    }

    document.execCommand('fontSize', false, size.toString());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rsw-btn" title="Font size">
          <Type className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {fontSizes.map(([label, size]) => (
          <DropdownMenuItem
            key={size}
            onSelect={() => handleSelect(size)}
            className="hover:bg-muted cursor-pointer rounded-sm text-sm transition-colors"
          >
            <span className={`font-semibold text-${label}`}>Aa {label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
