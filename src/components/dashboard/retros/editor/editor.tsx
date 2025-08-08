'use client';

import { useEffect, useState } from 'react';
import Editor, { type ContentEditableEvent, Separator, Toolbar } from 'react-simple-wysiwyg';
import { BtnLink } from './btn-link';
import { BtnNumberedList } from './btn-numbered-list';
import { BtnBulletList } from './btn-bullet-list';
import { BtnStrikeThrough } from './btn-strike-through';
import { BtnUnderline } from './btn-underline';
import { BtnItalic } from './btn-italic';
import { BtnBold } from './btn-bold';
import { BtnUndo } from './btn-undo';
import { BtnRedo } from './btn-redo';
import { BtnClearFormatting } from './btn-clean-formatting';
import { useRetros } from '@/hooks/useRetros';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import type { PageParams } from '@/types/utils/pageParams.type';
import type { Retro } from '@/types/retro.type';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useDateFnsLocale } from '@/hooks/ui/useDateFnsLocale';

const RetrosNotesEditor = () => {
  const locale = useDateFnsLocale();
  const { data } = useRetros({ query: '*' });
  const params = useParams<PageParams>();
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [retro, setRetro] = useState<Retro | null>(null);

  useEffect(() => {
    const retro = data?.find((retro) => retro.UUID === params.UUID);

    // Set active retro
    setRetro(retro || null);
  }, [data, params]);

  useEffect(() => {
    if (retro) {
      setName(retro.name);
      setBody(retro.body || '');
    }
  }, [retro]);

  const handleRetroChange = (UUID: string) => {
    const retro = data?.find((retro) => retro.UUID === UUID);

    // Set active retro
    setRetro(retro || null);
  };

  return (
    <div className="flex flex-col gap-4">
      {data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              readOnly
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="dropdown-content-width-full">
            <DropdownMenuRadioGroup value={retro?.UUID} onValueChange={handleRetroChange}>
              {data.map((retro) => (
                <DropdownMenuRadioItem
                  className="hover:bg-muted cursor-pointer rounded-sm text-sm transition-colors"
                  key={retro.UUID}
                  value={retro.UUID}
                >
                  <div className="flex w-full items-center justify-between">
                    {retro.name}
                    <span className="text-muted-foreground text-sx block">
                      {format(new Date(retro.createdAt as string), 'EEEE, do MMMM', {
                        locale,
                      })}
                    </span>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Skeleton className="h-9 w-full rounded-md" />
      )}
      <Editor
        value={body}
        onChange={(event: ContentEditableEvent) => setBody(event.target.value)}
        placeholder="..."
        className="prose min-h-64"
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnBulletList />
          <BtnNumberedList />
          <Separator />
          <BtnLink />
          <Separator />
          <BtnClearFormatting />
        </Toolbar>
      </Editor>
    </div>
  );
};

export default RetrosNotesEditor;
