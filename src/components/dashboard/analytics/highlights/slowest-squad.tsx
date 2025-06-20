'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { Snail } from 'lucide-react';
import NumberTicker from '../number-ticker';

const SlowestSquad = () => {
  const { analyticsTeammates } = useAnalyticsStore();
  const [role, setRole] = useState<string>();
  const [total, setTotal] = useState<number>();

  useEffect(() => {
    const roleTotals = new Map();

    for (const a of analyticsTeammates) {
      const role = a.teammate?.role;
      roleTotals.set(role, (roleTotals.get(role) || 0) + a.total);
    }

    let maxRole = null;
    let maxTotal = -Infinity;

    for (const [role, total] of roleTotals) {
      if (total > maxTotal) {
        maxTotal = total;
        maxRole = role;
      }
    }

    // Set slow role and total
    setRole(maxRole);
    setTotal(maxTotal);
  }, [analyticsTeammates]);

  return role && total ? (
    <Card className="size-full gap-2 p-2">
      <CardContent className="size-full gap-0 p-0">
        <CardDescription className="flex size-full flex-col items-center justify-between gap-0">
          <p className="text-foreground flex w-full items-center justify-center gap-2 text-sm font-semibold">
            <Snail className="size-4 min-w-4" />
            <span className="truncate">Slowest Squad</span>
          </p>
          <span className="text-2xl font-semibold text-red-500">{role}</span>
          <span className="text-muted-foreground text-sm font-semibold">
            <NumberTicker total={total} />
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  ) : null;
};

export default SlowestSquad;
