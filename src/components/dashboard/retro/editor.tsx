'use client';

import { useState } from 'react';
import Editor, {
  type ContentEditableEvent,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  BtnBulletList,
  BtnNumberedList,
  Toolbar,
} from 'react-simple-wysiwyg';

const RetroNotesEditor = () => {
  const [html, setHtml] = useState('my <b>HTML</b>');

  const handleChange = (event: ContentEditableEvent) => {
    setHtml(event.target.value);
  };

  return (
    <Editor value={html} onChange={handleChange} className="min-h-32 w-full sm:min-h-64">
      <Toolbar>
        <BtnBold />
        <BtnItalic />
        <BtnUnderline />
        <BtnStrikeThrough />
        <BtnBulletList />
        <BtnNumberedList />
      </Toolbar>
    </Editor>
  );
};

export default RetroNotesEditor;
