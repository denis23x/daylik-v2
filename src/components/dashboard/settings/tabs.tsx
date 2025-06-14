'use client';

import TabsEmail from './tabs/tabs-email';
import TabsPassword from './tabs/tabs-password';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSearchParams } from 'next/navigation';
import { Settings } from 'lucide-react';

const ProfileTabs = () => {
  const searchParams = useSearchParams();
  const tabs = searchParams.get('tabs') || 'email';

  return (
    <div className="min-h-screen-grid container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Settings />
          <span className="text-xl font-bold">Settings</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <Tabs defaultValue={tabs} className="w-full sm:max-w-md">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <TabsEmail />
            </TabsContent>
            <TabsContent value="password">
              <TabsPassword />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
