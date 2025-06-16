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
import { useEffect, useState } from 'react';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TooltipFormatter } from './data-chart-linear/tooltip-formatter';
import { getSeconds } from '@/utils/getSeconds';

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

const AnalyticsDataChartLinear = ({ analytics }: { analytics: AnalyticsTeammate[] }) => {
  const [type, setType] = useState<ChartType>('natural');
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (analytics.length) {
      const data = analytics.map((analytics: AnalyticsTeammate) => ({
        name: analytics.teammate?.name as string,
        overtime: analytics.overtime as number,
        total: getSeconds(analytics.total as number),
        paused: getSeconds(analytics.paused as number),
      }));

      setChartData(data);
    }
  }, [analytics]);

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Daily Sync Timeline</CardTitle>
        <CardDescription>A complete breakdown of today&apos;s standup</CardDescription>
        <CardAction>
          <Select value={type} onValueChange={(value) => setType(value as typeof type)}>
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
              type={type}
              fill="url(#fillTotal)"
              fillOpacity={0.4}
              stroke="var(--color-total)"
              stackId="a"
            />
            <Area
              dataKey="paused"
              type={type}
              fill="url(#fillPaused)"
              fillOpacity={0.4}
              stroke="var(--color-paused)"
              stackId="b"
            />
            <Area
              dataKey="overtime"
              type={type}
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

export default AnalyticsDataChartLinear;
