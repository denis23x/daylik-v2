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
import type { AnalyticTeammate } from '@/types/analyticTeammate.type';
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

type ChartType = 'step' | 'linear' | 'natural';

type ChartData = {
  name: string;
  elapsed: number;
  overtime: number;
  overall: number;
};

const chartConfig = {
  elapsed: {
    label: 'Elapsed',
    color: 'var(--chart-1)',
  },
  overall: {
    label: 'Overall (with pauses)',
    color: 'var(--chart-2)',
  },
  overtime: {
    label: 'Overtime',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

const AnalyticsDataChartLinear = ({ teammates }: { teammates: AnalyticTeammate[] }) => {
  const [type, setType] = useState<ChartType>('natural');
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (teammates.length) {
      const data = teammates.map((analyticTeammate: AnalyticTeammate) => {
        const startedAt = new Date(analyticTeammate.startedAt as string).getTime();
        const finishedAt = new Date(analyticTeammate.finishedAt as string).getTime();

        return {
          name: analyticTeammate.teammate.name,
          elapsed: analyticTeammate.elapsed as number,
          overtime: analyticTeammate.overtime as number,
          overall: parseInt((Math.floor(finishedAt - startedAt) / 1000).toFixed()),
        };
      });

      setChartData(data);
    }
  }, [teammates]);

  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Sync flow</CardTitle>
        <CardDescription>How much time each teammate spoke today</CardDescription>
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
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: -32, right: 16 }}>
            <CartesianGrid vertical={false} />
            <XAxis tickLine={false} axisLine={true} tickMargin={8} dataKey="name" />
            <YAxis tickLine={false} axisLine={true} tickMargin={8} tickCount={5} />
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
              <linearGradient id="fillElapsed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-elapsed)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-elapsed)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="fillOverall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-overall)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-overall)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="fillOvertime" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-overtime)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-overtime)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="elapsed"
              type={type}
              fill="url(#fillElapsed)"
              fillOpacity={0.4}
              stroke="var(--color-elapsed)"
              stackId="a"
            />
            <Area
              dataKey="overall"
              type={type}
              fill="url(#fillOverall)"
              fillOpacity={0.4}
              stroke="var(--color-overall)"
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
