'use client';

import { useState } from 'react';
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

const RetroNotesEditor = () => {
  const [html, setHtml] = useState('');

  const handleChange = (event: ContentEditableEvent) => {
    setHtml(event.target.value);
  };

  return (
    <Editor
      value={html}
      onChange={handleChange}
      placeholder="..."
      className="prose min-h-32 w-full sm:min-h-64"
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
  );
};

export default RetroNotesEditor;
