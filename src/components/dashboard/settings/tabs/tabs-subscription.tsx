'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TabsSubscription = () => {
  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Subscription</CardTitle>
        <CardDescription className="border-b pb-6">
          Manage your subscription and billing details. Update your subscription plan, view your
          billing history, and manage your payment methods.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">content</CardContent>
    </Card>
  );
};

export default TabsSubscription;
