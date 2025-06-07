// 'use client';

// import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart';
// import type { SyncTeammate } from '@/types/syncTeammate.type';

// const chartConfig = {
//   desktop: {
//     label: 'Today',
//     color: 'var(--chart-3)',
//   },
//   desktop2: {
//     label: 'Yesterday',
//     color: 'var(--chart-3)',
//   },
// } satisfies ChartConfig;

// function transformTeammatesToChartData(teammates: SyncTeammate[]) {
//   return teammates
//     .filter(
//       (t) =>
//         t.sync?.status === 'done' &&
//         typeof t.sync.startedAt === 'number' &&
//         typeof t.sync.finishedAt === 'number'
//     )
//     .map((t) => ({
//       name: t.name,
//       desktop:
//         (t.sync.finishedAt && t.sync.startedAt
//           ? new Date(t.sync.finishedAt).getTime() - new Date(t.sync.startedAt).getTime()
//           : 0) / 1000,
//       desktop2:
//         (t.sync.finishedAt && t.sync.startedAt
//           ? new Date(t.sync.finishedAt).getTime() - new Date(t.sync.startedAt).getTime()
//           : 0) /
//           1000 -
//         10,
//     }));
// }

// const AnalyticsChart = ({ teammates }: { teammates: TeammateSync[] }) => {
//   const chartData = transformTeammatesToChartData(teammates);

//   return (
//     <Card className="p-4">
//       <CardHeader className="p-0">
//         <CardTitle>Sync time</CardTitle>
//         <CardDescription>How much time each teammate spoke today</CardDescription>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
//           <AreaChart accessibilityLayer data={chartData} margin={{ left: 16, right: 16 }}>
//             <CartesianGrid vertical={false} />
//             <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
//             <Area
//               dataKey="desktop"
//               type="natural"
//               fill="var(--color-desktop)"
//               fillOpacity={0.4}
//               stroke="var(--color-desktop)"
//               stackId="a"
//             />
//             <Area
//               dataKey="desktop2"
//               type="natural"
//               fill="var(--color-desktop)"
//               fillOpacity={0.4}
//               stroke="var(--color-desktop)"
//               stackId="a"
//             />
//             <ChartLegend content={<ChartLegendContent />} />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default AnalyticsChart;
