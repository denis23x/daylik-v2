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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RetroNotesEditor = () => {
  const [html, setHtml] = useState('');
  const [tab, setTab] = useState('');

  const handleTabsChange = (value: string) => {
    setTab(value);
  };

  const handleChange = (event: ContentEditableEvent) => {
    setHtml(event.target.value);
  };

  return (
    <Tabs className="mb-4 w-full sm:mb-0" value={tab} onValueChange={handleTabsChange}>
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="1">June 20</TabsTrigger>
        <TabsTrigger value="2">June 27</TabsTrigger>
        <TabsTrigger value="3">Jule 13</TabsTrigger>
        <TabsTrigger value="4">Jule 20</TabsTrigger>
        <TabsTrigger value="5">Aug 03</TabsTrigger>
      </TabsList>
      <Editor value={html} onChange={handleChange} placeholder="..." className="prose min-h-64">
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
    </Tabs>
  );
};

export default RetroNotesEditor;
