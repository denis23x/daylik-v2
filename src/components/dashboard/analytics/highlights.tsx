// 'use client';

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Rabbit, Snail } from 'lucide-react';
// import type { SyncTeammate } from '@/types/syncTeammate.type';
// import { useEffect, useMemo, useState } from 'react';
// import { getContrastingColor } from '@/utils/getContrastingColor';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { formatDuration } from '@/utils/formatDuration';
// import { NumberTicker } from '@/components/magicui/number-ticker';
// import { formatDuration2 } from '@/utils/formatDuration2';
// import TimeTicker from '@/components/time-ticker';

// // TODO: get from config
// const TIMER = 60;

// function getRoleTimeStats(teammates: SyncTeammate[]) {
//   const roleTimes: Record<string, { totalTime: number; count: number }> = {};

//   for (const teammate of teammates) {
//     const { role, sync } = teammate;
//     const timeSpent = new Date(sync.finishedAt).getTime() - new Date(sync.startedAt).getTime();

//     if (!roleTimes[role]) {
//       roleTimes[role] = { totalTime: 0, count: 0 };
//     }

//     roleTimes[role].totalTime += timeSpent;
//     roleTimes[role].count += 1;
//   }

//   return Object.entries(roleTimes).map(([role, data]) => ({
//     role,
//     total: data.totalTime,
//     medium: Math.round(data.totalTime / data.count),
//   }));
// }

// const AnalyticsHighlights = ({ teammates }: { teammates: TeammateSync[] }) => {
//   const [fastestTeammate, slowestTeammate] = useMemo(() => {
//     const fastest = teammates.reduce((fastest, current) => {
//       return current.sync.finishedAt &&
//         current.sync.startedAt &&
//         fastest.sync.finishedAt &&
//         fastest.sync.startedAt &&
//         new Date(current.sync.finishedAt).getTime() - new Date(current.sync.startedAt).getTime() <
//           new Date(fastest.sync.finishedAt).getTime() - new Date(fastest.sync.startedAt).getTime()
//         ? current
//         : fastest;
//     }, teammates[0]);

//     const slowest = teammates.reduce((slowest, current) => {
//       return current.sync.finishedAt &&
//         current.sync.startedAt &&
//         slowest.sync.finishedAt &&
//         slowest.sync.startedAt &&
//         new Date(current.sync.finishedAt).getTime() - new Date(current.sync.startedAt).getTime() >
//           new Date(slowest.sync.finishedAt).getTime() - new Date(slowest.sync.startedAt).getTime()
//         ? current
//         : slowest;
//     }, teammates[0]);

//     return [fastest, slowest];
//   }, [teammates]);

//   const [stats] = useState(getRoleTimeStats(teammates));

//   const { fastest, slowest } = useMemo(() => {
//     if (stats.length === 0) return { fastest: null, slowest: null };

//     const fastest = stats.reduce((min, curr) => (curr.total < min.total ? curr : min));

//     const slowest = stats.reduce((max, curr) => (curr.medium > max.medium ? curr : max));

//     return { fastest, slowest };
//   }, [stats]);

//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   useEffect(() => {
//     const valid = teammates.filter((t) => t.sync?.startedAt && t.sync?.finishedAt);

//     if (valid.length === 0) return;

//     const totalMs = valid.reduce(
//       (acc, t) =>
//         acc + (new Date(t.sync.finishedAt).getTime() - new Date(t.sync.startedAt).getTime()),
//       0
//     );

//     const avgMs = totalMs / valid.length;
//     const avgSec = Math.round(avgMs / 1000);

//     setMinutes(Math.floor(avgSec / 60));
//     setSeconds(avgSec % 60);
//   }, [teammates]);

//   return (
//     <div className="flex flex-col gap-4">
//       <Card className="gap-4 p-4">
//         <CardContent className="flex flex-col gap-2 p-0">
//           <span>
//             Predicted sync time for <strong>{teammates.length}</strong> teammates with timer{' '}
//             <strong>{TIMER}s</strong> should take{' '}
//             <strong>{(TIMER * teammates.length) / 60} minutes</strong>
//           </span>
//           <span>
//             For this sync it took <strong>{formatDuration(1748750493124, 1748750947185)}</strong>
//           </span>
//           <span>
//             Average sync time for 1 teammate:{' '}
//             <strong>
//               {minutes}m {seconds}s
//             </strong>
//             <br />
//           </span>
//         </CardContent>
//       </Card>
//       <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//         <li>
//           <Card className="gap-4 p-4">
//             <CardHeader className="gap-0 p-0">
//               <CardTitle className="flex flex-col gap-2">
//                 <Rabbit className="text-emerald-500" />
//                 <span className="text-sm">Fastest</span>
//               </CardTitle>
//               <CardDescription>
//                 <NumberTicker startValue={0} value={128} />s The fastest teammate during this sync
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex items-center gap-2 p-0">
//               <Avatar className="aspect-square size-8 border">
//                 <AvatarImage
//                   className="bg-secondary object-cover"
//                   src={fastestTeammate.avatar || undefined}
//                 />
//                 <AvatarFallback style={{ backgroundColor: fastestTeammate.color }}>
//                   <span
//                     className="scale-90 text-xs"
//                     style={{ color: getContrastingColor(fastestTeammate.color) }}
//                   >
//                     {fastestTeammate.name.slice(0, 2).toUpperCase()}
//                   </span>
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-1 items-center justify-between gap-4">
//                 <div className="flex flex-col">
//                   <span className="text-sm">{fastestTeammate.name}</span>
//                   <span className="text-muted-foreground text-sm">{fastestTeammate.role}</span>
//                 </div>
//                 <span className="text-lg font-semibold">
//                   <TimeTicker total={128} timer={TIMER} />
//                   {formatDuration(
//                     new Date(fastestTeammate.sync.startedAt).getTime(),
//                     new Date(fastestTeammate.sync.finishedAt).getTime()
//                   )}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>
//         </li>
//         <li>
//           <Card className="gap-4 p-4">
//             <CardHeader className="gap-0 p-0">
//               <CardTitle className="flex flex-col gap-2">
//                 <Snail />
//                 <span className="text-sm">Slowest</span>
//               </CardTitle>
//               <CardDescription>The slowest teammate during this sync</CardDescription>
//             </CardHeader>
//             <CardContent className="flex items-center gap-2 p-0">
//               <Avatar className="aspect-square size-8 border">
//                 <AvatarImage
//                   className="bg-secondary object-cover"
//                   src={slowestTeammate.avatar || undefined}
//                 />
//                 <AvatarFallback style={{ backgroundColor: slowestTeammate.color }}>
//                   <span
//                     className="scale-90 text-xs"
//                     style={{ color: getContrastingColor(slowestTeammate.color) }}
//                   >
//                     {slowestTeammate.name.slice(0, 2).toUpperCase()}
//                   </span>
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-1 items-center justify-between gap-4">
//                 <div className="flex flex-col">
//                   <span className="text-sm">{slowestTeammate.name}</span>
//                   <span className="text-muted-foreground text-sm">{slowestTeammate.role}</span>
//                 </div>
//                 <span className="text-lg font-semibold">
//                   {formatDuration(
//                     new Date(slowestTeammate.sync.startedAt).getTime(),
//                     new Date(slowestTeammate.sync.finishedAt).getTime()
//                   )}
//                 </span>
//               </div>
//             </CardContent>
//           </Card>
//         </li>
//         <li>
//           <Card className="gap-4 p-4">
//             <CardHeader className="gap-0 p-0">
//               <CardTitle className="flex flex-col gap-2">
//                 <Rabbit />
//                 <span className="text-sm">Fastest Role {fastest?.role}</span>
//               </CardTitle>
//               <CardDescription>The fastest teammate during this sync</CardDescription>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-2 p-0">
//               <div className="flex flex-1 items-center justify-between gap-4">
//                 Total: {formatDuration2(fastest?.total ?? 0)}
//               </div>
//               <div className="flex flex-1 items-center justify-between gap-4">
//                 Medium: {formatDuration2(fastest?.medium ?? 0)}
//               </div>
//             </CardContent>
//           </Card>
//         </li>
//         <li>
//           <Card className="gap-4 p-4">
//             <CardHeader className="gap-0 p-0">
//               <CardTitle className="flex flex-col gap-2">
//                 <Rabbit />
//                 <span className="text-sm">Slowest Role {slowest?.role}</span>
//               </CardTitle>
//               <CardDescription>The slowest teammate during this sync</CardDescription>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-2 p-0">
//               <div className="flex flex-1 items-center justify-between gap-4">
//                 Total: {formatDuration2(slowest?.total ?? 0)}
//               </div>
//               <div className="flex flex-1 items-center justify-between gap-4">
//                 Medium: {formatDuration2(slowest?.medium ?? 0)}
//               </div>
//             </CardContent>
//           </Card>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default AnalyticsHighlights;
