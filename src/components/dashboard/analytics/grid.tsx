'use client';

import { ChartLine } from 'lucide-react';
import AnalyticsDataTable from './data-table';
import type { TeammateWithState } from '@/types/teammateWithState.type';

const AnalyticsGrid = () => {
  // const { team, teammates, startedAt, finishedAt } = useSyncLiveStore();

  const timer = 60;

  // const startedAt = 1748750493124;
  // const finishedAt = 1748750947185;

  const team = {
    UUID: '33d924a4-9864-4918-b7ec-cf059f50a55e',
    name: 'TargetGram',
    userUUID: 'e5c38951-3bd2-4673-b0f4-4217008b20d1',
    createdAt: '2025-05-25T06:10:14.979011+00:00',
  };

  const teammates: TeammateWithState[] = [
    {
      UUID: '3a6a9bf4-44e1-4f99-80a7-79b04ca4aa83',
      name: 'Анна',
      role: 'Backend',
      color: '#0061fe',
      avatar: null,
      userUUID: team.userUUID,
      createdAt: team.createdAt,
      state: {
        status: 'done',
        startedAt: 1748750559502,
        finishedAt: 1748750633240,
      },
    },
    {
      UUID: 'fce7bf5b-33fc-453a-8990-aa6a8f54b542',
      name: 'Рома',
      role: 'Sales',
      color: '#247fb7',
      avatar: null,
      userUUID: team.userUUID,
      createdAt: team.createdAt,
      state: {
        status: 'done',
        startedAt: 1748750636494,
        finishedAt: 1748750785745,
      },
    },
    {
      UUID: '6aa264de-b84b-42b6-b659-a59869206b93',
      name: 'Данил',
      role: 'Backend',
      color: '#0a5adb',
      avatar: null,
      userUUID: team.userUUID,
      createdAt: team.createdAt,
      state: {
        status: 'done',
        startedAt: 1748750503286,
        finishedAt: 1748750559502,
      },
    },
    {
      UUID: '8ddd01c0-c29b-4e3f-9909-377ce69abb27',
      name: 'Вася',
      role: 'Frontend',
      color: '#5c82db',
      avatar: null,
      userUUID: team.userUUID,
      createdAt: team.createdAt,
      state: {
        status: 'done',
        startedAt: 1748750785745,
        finishedAt: 1748750830882,
      },
    },
    {
      UUID: '83304e23-c6f7-4dda-8211-188038fb8bfe',
      name: 'Петя',
      role: 'Frontend',
      color: '#404cf2',
      avatar: null,
      userUUID: team.userUUID,
      createdAt: team.createdAt,
      state: {
        status: 'done',
        startedAt: 1748750878002,
        finishedAt: 1748750919023,
      },
    },
    {
      UUID: 'bed04e7e-d267-4463-81fd-713aa874de9f',
      name: 'Настя',
      role: 'QA',
      color: '#4947cd',
      avatar: null,
      userUUID: team.userUUID,
      createdAt: team.createdAt,
      state: {
        status: 'done',
        startedAt: 1748750834181,
        finishedAt: 1748750878002,
      },
    },
    {
      UUID: '6c08faea-fd7a-4077-868a-df2c57fceca8',
      name: 'Ярослав',
      role: 'QA',
      color: '#184E78',
      avatar: null,
      userUUID: team.userUUID,
      createdAt: team.createdAt,
      state: {
        status: 'done',
        startedAt: 1748750920326,
        finishedAt: 1748750947150,
      },
    },
  ];

  return (
    <div className="min-h-screen-daylik container mx-auto p-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex min-h-9 items-center gap-4">
          <ChartLine />
          <span className="text-xl font-bold">Analytics</span>
        </div>
        <AnalyticsDataTable teammates={teammates} timer={timer}></AnalyticsDataTable>
      </div>
      {/* <div className="flex w-full flex-col gap-4">
        <div>startedAt - {startedAt}</div>
        <div>finishedAt - {finishedAt}</div>
        <pre>{JSON.stringify(team, null, 2)}</pre>
        <pre>{JSON.stringify(teammates, null, 2)}</pre>
      </div> */}
    </div>
  );
};

export default AnalyticsGrid;
