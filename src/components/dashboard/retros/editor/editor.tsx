'use client';

import { useEffect, useMemo, useRef } from 'react';
import Editor, { type ContentEditableEvent, Separator, Toolbar } from 'react-simple-wysiwyg';
import {
  BtnNumberedList,
  BtnBulletList,
  BtnStrikeThrough,
  BtnUnderline,
  BtnItalic,
  BtnBold,
  BtnUndo,
  BtnRedo,
  BtnClearFormatting,
  BtnHighlight,
  BtnHorizontalRule,
  BtnQuote,
} from './buttons';
import { BtnFontSize } from './buttons-font-size';
import { useRetros, useUpdateRetro } from '@/hooks/useRetros';
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
import { Skeleton } from '@/components/ui/skeleton';
import { useRetroStore } from '@/store/useRetroStore';
import { Button } from '@/components/ui/button';
import { Loader, Menu } from 'lucide-react';
import type { Retro } from '@/types/retro.type';
import { useTranslations } from 'next-intl';
import { useDebounceCallback } from 'usehooks-ts';
import { EditorProvider } from './editor-context';

// TODO: env
const DEBOUNCE = 1000;

const RetrosNotesEditor = () => {
  const t = useTranslations('components.dashboard.retros.editor');
  const { data } = useRetros({ query: '*' });
  const { mutate, isPending } = useUpdateRetro();
  const { retros, active, setRetros, setActive, setUpdate } = useRetroStore();
  const params = useParams<PageParams>();
  const retro = useMemo(() => retros.find((r) => r.UUID === active), [retros, active]);
  const debounce = useRef(useDebounceCallback((r) => mutate(r), DEBOUNCE));

  useEffect(() => {
    if (data) {
      setRetros(data);
    }
  }, [data, setRetros]);

  useEffect(() => {
    const { UUID } = params;

    if (UUID) {
      setActive(UUID);
    }
  }, [params, setActive]);

  const handleChange = (retro: Partial<Retro>) => {
    if (active) {
      setUpdate(active, { ...retro });

      // Update database
      debounce.current({
        UUID: active,
        ...retro,
      });
    }
  };

  return (
    <div className="mb-4 flex flex-col gap-4 sm:mb-0">
      {retro && active ? (
        <div className="flex items-center justify-start gap-4">
          <Input
            type="text"
            inputMode="text"
            spellCheck="false"
            autoCapitalize="none"
            value={retro.name}
            onChange={(event) => handleChange({ name: event.target.value })}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={active} onValueChange={setActive}>
                {retros &&
                  retros.map((retro) => (
                    <DropdownMenuRadioItem
                      className="hover:bg-muted cursor-pointer rounded-sm text-sm transition-colors"
                      key={retro.UUID}
                      value={retro.UUID}
                    >
                      <div className="flex w-full items-center justify-between gap-4">
                        {retro.name}
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Skeleton className="h-9 w-full rounded-md" />
      )}
      <div className="relative">
        <EditorProvider>
          <Editor
            value={retro?.body || ''}
            onChange={(event: ContentEditableEvent) => handleChange({ body: event.target.value })}
            placeholder="..."
            className="prose max-h-96 min-h-64"
          >
            <Toolbar>
              <BtnUndo title={t('undo')} />
              <BtnRedo title={t('redo')} />
              <Separator />
              <BtnFontSize title={t('fontSize')} className="rsw-btn !hidden sm:!flex" />
              <Separator className="rsw-separator !hidden sm:!block" />
              <BtnBold title={t('bold')} />
              <BtnItalic title={t('italic')} />
              <BtnUnderline title={t('underline')} />
              <BtnStrikeThrough title={t('strikeThrough')} />
              <Separator />
              <BtnBulletList title={t('bulletList')} />
              <BtnNumberedList title={t('numberedList')} />
              <Separator />
              <BtnQuote title={t('blockquote')} />
              <BtnHighlight title={t('highlight')} />
              <BtnClearFormatting title={t('clearFormatting')} />
              <BtnHorizontalRule title={t('horizontalRule')} />
            </Toolbar>
          </Editor>
        </EditorProvider>
        {isPending && (
          <div className="text-muted-foreground absolute right-4 bottom-4 animate-spin opacity-50">
            <Loader className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RetrosNotesEditor;
