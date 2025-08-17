'use client';

import { useRetrosMessages } from '@/hooks/useRetrosMessages';
import { useParams } from 'next/navigation';
import type { PageParams } from '@/types/utils/pageParams.type';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { Bug, HatGlasses, MessageCircleOff, RefreshCw, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RetrosMessages = () => {
  const t = useTranslations('components.dashboard.retros.messages');
  const params = useParams<PageParams>();
  const {
    data: messages,
    isLoading,
    error,
    refetch,
  } = useRetrosMessages({
    query: '*',
    UUID: params.UUID as string,
  });

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex">
        <ScrollArea className="max-h-72 w-full pr-4" type="always">
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
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <Bug />
              <div className="text-center text-sm">{t('error')}</div>
            </div>
          )}
          {!isLoading && !error && messages?.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 pt-4">
              <MessageCircleOff />
              <div className="text-center text-sm">{t('empty')}</div>
            </div>
          )}
          {!isLoading && !error && messages?.length !== 0 && (
            <ul className="flex flex-col gap-2">
              {messages?.map((message) => (
                <li key={message.UUID} className="flex">
                  <Alert variant="default">
                    {message.name ? (
                      <UserRound className="stroke-muted-foreground" />
                    ) : (
                      <HatGlasses className="stroke-muted-foreground" />
                    )}
                    {message.name && <AlertTitle>{message.name}</AlertTitle>}
                    <AlertDescription>{message.description}</AlertDescription>
                  </Alert>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </div>
      {!isLoading && !error && messages?.length !== 0 && (
        <Button variant="secondary" onClick={handleRefresh}>
          <RefreshCw />
          {t('refresh')}
        </Button>
      )}
    </div>
  );
};

export default RetrosMessages;
