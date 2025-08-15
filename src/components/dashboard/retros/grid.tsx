'use client';

import RetrosWordcloud from '@/components/dashboard/retros/wordcloud/wordcloud-dynamic';
import RetrosMessagesAlert from './messages/messages-alert';
import RetrosDock from '@/components/dashboard/retros/dock/dock-suspense';

const RetrosGrid = () => {
  return (
    <>
      <RetrosWordcloud />
      <RetrosDock />
      <RetrosMessagesAlert />
    </>
  );
};

export default RetrosGrid;
