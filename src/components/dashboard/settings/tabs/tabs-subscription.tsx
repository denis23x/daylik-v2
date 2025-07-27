'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const TabsSubscription = () => {
  const t = useTranslations('components.dashboard.settings.subscription');

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription className="border-b pb-6">{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="rounded-xl border p-4">
        <span className="text-base font-semibold">{t('plan.name')}</span>
        <p className="text-muted-foreground text-sm">{t('plan.description')}</p>
        <Separator className="my-4" />
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            {t('features.unlimitedTeams')}
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            {t('features.unlimitedTeammates')}
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            {t('features.unlimitedSyncs')}
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            {t('features.basicAnalytics')}
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            {t('features.unlimitedHistory')}
          </li>
          <li className="flex items-start gap-2">
            <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
            {t('features.prioritySupport')}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default TabsSubscription;
