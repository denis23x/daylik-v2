'use client';

import TabsEmail from './tabs/tabs-email';
import TabsPassword from './tabs/tabs-password';
import TabsSubscription from './tabs/tabs-subscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getQueryParams } from '@/utils/getQueryParams';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const SettingsTabs = () => {
  const t = useTranslations('components.dashboard.settings.tabs');
  const [tab, setTab] = useState('email');

  useEffect(() => {
    const onPopState = () => setTab(getQueryParams('tabs') || 'subscription');

    onPopState();

    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  const handleTabsChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tabs', value);
    window.history.pushState({}, '', url.toString());
    setTab(value);
  };

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Settings />
          <span className="text-xl font-bold">{t('title')}</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <Tabs value={tab} onValueChange={handleTabsChange} className="w-full sm:max-w-md">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="subscription">{t('names.subscription')}</TabsTrigger>
              <TabsTrigger value="email">{t('names.email')}</TabsTrigger>
              <TabsTrigger value="password">{t('names.password')}</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <TabsEmail />
            </TabsContent>
            <TabsContent value="password">
              <TabsPassword />
            </TabsContent>
            <TabsContent value="subscription">
              <TabsSubscription />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabs;
