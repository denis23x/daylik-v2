'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TooltipFormatter } from './tooltip-formatter';
import { getSeconds } from '@/utils/getSeconds';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { COOKIE_CONSENT } from '@/lib/constants';
import { getCookie, setCookie } from '@/hooks/useCookie';

type ChartType = 'step' | 'linear' | 'natural';

type ChartData = {
  name: string;
  overtime: number;
  total: number;
  paused: number;
};

const chartConfig = {
  total: {
    label: 'Total',
    color: 'var(--color-chart-1)',
  },
  paused: {
    label: 'Paused',
    color: 'var(--color-chart-3)',
  },
  overtime: {
    label: 'Overtime',
    color: 'var(--destructive)',
  },
} satisfies ChartConfig;

const AnalyticsChartLinear = () => {
  const keyTypes = useRef('analytics-chart-type');
  const [type, setType] = useState<string>('');
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { analyticsTeammates } = useAnalyticsStore();

  useEffect(() => {
    if (analyticsTeammates.length) {
      const data = analyticsTeammates.map((analytics: AnalyticsTeammate) => ({
        name: analytics.teammate?.name as string,
        overtime: analytics.overtime as number,
        total: getSeconds(analytics.total as number),
        paused: getSeconds(analytics.paused as number),
      }));

      setChartData(data);
    }
  }, [analyticsTeammates]);

  useEffect(() => {
    // Get type from cookie
    setType((getCookie(keyTypes.current) as ChartType) || 'linear');
  }, []);

  const handleTypeChange = (value: string) => {
    setType(value as ChartType);

    // Save type to cookie
    if (Number(getCookie(COOKIE_CONSENT))) {
      setCookie(keyTypes.current, value);
    }
  };

  return (
    <Card className="bg-transparent p-4">
      <CardHeader className="p-0">
        <CardTitle>Sync Timeline</CardTitle>
        <CardDescription>A complete breakdown of today&apos;s sync</CardDescription>
        <CardAction>
          <Select value={type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-30">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="step">Step</SelectItem>
                <SelectItem value="linear">Linear</SelectItem>
                <SelectItem value="natural">Natural</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-64 w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: -32, top: 16, right: 16 }}>
            <CartesianGrid vertical={false} />
            <XAxis tickLine={false} axisLine={true} tickMargin={8} dataKey="name" />
            <YAxis tickLine={false} axisLine={true} tickMargin={8} dataKey="total" />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value, name, item) => {
                    return (
                      <TooltipFormatter
                        config={chartConfig}
                        value={value as number}
                        name={name as string}
                        item={item as { color: string }}
                      />
                    );
                  }}
                />
              }
            />
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="fillPaused" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-paused)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-paused)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="fillOvertime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-overtime)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-overtime)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="total"
              type={type as ChartType}
              fill="url(#fillTotal)"
              fillOpacity={0.4}
              stroke="var(--color-total)"
              stackId="a"
            />
            <Area
              dataKey="paused"
              type={type as ChartType}
              fill="url(#fillPaused)"
              fillOpacity={0.4}
              stroke="var(--color-paused)"
              stackId="b"
            />
            <Area
              dataKey="overtime"
              type={type as ChartType}
              fill="url(#fillOvertime)"
              fillOpacity={0.4}
              stroke="var(--color-overtime)"
              stackId="c"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChartLinear;
