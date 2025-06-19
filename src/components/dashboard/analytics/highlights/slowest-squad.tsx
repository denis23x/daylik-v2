'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDuration } from '@/utils/formatDuration';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';

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
    <Card>
      <CardHeader>
        <CardTitle>Slowest Squad</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          {role} - {formatDuration(total)}
        </CardDescription>
      </CardContent>
    </Card>
  ) : null;
};

export default SlowestSquad;
