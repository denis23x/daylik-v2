'use client';

import TabsPassword from '@/components/dashboard/profile/tabs/tabs-password';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabsEmail from './tabs/tabs-email';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProfileTabs = () => {
  const searchParams = useSearchParams();
  const [tabs, setTabs] = useState('email');

  useEffect(() => {
    const tabs = searchParams.get('tabs');

    if (tabs) {
      setTabs(tabs);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4">
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
  );
};

export default ProfileTabs;
