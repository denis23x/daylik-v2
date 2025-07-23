'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck } from 'lucide-react';

const TabsSubscription = () => {
  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Active Subscription</CardTitle>
        <CardDescription className="border-b pb-6">
          Manage your subscription and billing details. Update your subscription plan, view your
          billing history, and manage your payment methods.
        </CardDescription>
      </CardHeader>
      <CardContent className="rounded-xl border p-4">
        <span className="text-base font-semibold">Open Beta</span>
        <p className="text-muted-foreground text-sm">
          Full access during the beta period. All features unlocked for free.
        </p>
        <Separator className="my-4" />
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            Unlimited teams
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            Unlimited teammates
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            Unlimited syncs
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            Basic analytics
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            Unlimited sync history
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            Priority support
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TabsSubscription;
