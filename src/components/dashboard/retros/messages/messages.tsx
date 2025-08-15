'use client';

import { useRetrosMessages } from '@/hooks/useRetrosMessages';
import { useParams } from 'next/navigation';
import type { PageParams } from '@/types/utils/pageParams.type';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';

const RetrosMessages = () => {
  const t = useTranslations('components.dashboard.retros.messages');
  const params = useParams<PageParams>();
  const {
    data: messages,
    isLoading,
    error,
  } = useRetrosMessages({
    query: '*',
    UUID: params.UUID as string,
  });

  return (
    <div className="mb-4 flex flex-col gap-4 sm:mb-0">
      <ScrollArea className="max-h-72 pr-4" type="always">
        {isLoading && (
          <ul className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <li key={index}>
                <Skeleton className="h-12 w-full rounded-lg" />
              </li>
            ))}
          </ul>
        )}
        {error && (
          <div className="text-muted-foreground py-3 text-center text-sm">{t('error')}</div>
        )}
        {!isLoading && !error && messages?.length === 0 && (
          <div className="text-muted-foreground py-3 text-center text-sm">{t('empty')}</div>
        )}
        {!isLoading && !error && messages?.length !== 0 && (
          <ul className="flex flex-col gap-2">
            {messages?.map((message) => (
              <li key={message.UUID} className="flex">
                <Alert variant="default">
                  {message.name && <AlertTitle>{message.name}</AlertTitle>}
                  <AlertDescription>{message.description}</AlertDescription>
                </Alert>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};

export default RetrosMessages;
