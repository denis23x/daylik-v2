'use client';

import TabsPassword from '@/components/dashboard/profile/tabs/tabs-password';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabsEmail from './tabs/tabs-email';
import { useSearchParams } from 'next/navigation';
import { Settings } from 'lucide-react';

const ProfileTabs = () => {
  const searchParams = useSearchParams();
  const tabs = searchParams.get('tabs') || 'email';

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <Settings />
          <span className="text-xl font-bold">Profile</span>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <Tabs defaultValue={tabs} className="w-[400px]">
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
