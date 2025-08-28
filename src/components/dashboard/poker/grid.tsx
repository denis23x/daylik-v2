'use client';

import { usePokerByUUID } from '@/hooks/usePoker';
import { usePokerIssues } from '@/hooks/usePokerIssues';
import { usePokerStore } from '@/store/usePokerStore';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import PokerCarousel from './carousel/carousel';
import PokerDock from './dock/dock';

const PokerGrid = () => {
  const params = useParams();
  const { setPoker, setIssues } = usePokerStore();
  const { data: issues, isLoading: isLoadingIssues } = usePokerIssues({
    query: '*',
    pokerUUID: params.UUID as string,
  });
  const { data: poker } = usePokerByUUID({
    query: '*',
    UUID: params.UUID as string,
  });

  useEffect(() => {
    if (poker) {
      setPoker(poker);
    }
  }, [poker, setPoker]);

  useEffect(() => {
    if (issues) {
      setIssues(issues);
    }
  }, [issues, setIssues]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <PokerDock />
      {isLoadingIssues ? <Skeleton className="h-48 w-full max-w-xl" /> : <PokerCarousel />}
    </div>
  );
};

export default PokerGrid;
