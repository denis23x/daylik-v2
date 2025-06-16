'use client';

import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import type { Analytics } from '@/types/analytics.type';
import AverageTime from './data-highlights/average-time';

// function getRoleTimeStats(teammates: AnalyticsTeammate[]) {
//   const roleTimes: Record<string, { totalTime: number; count: number }> = {};

//   for (const teammate of teammates) {
//     const { role } = teammate.teammate;

//     if (!roleTimes[role]) {
//       roleTimes[role] = { totalTime: 0, count: 0 };
//     }

//     roleTimes[role].totalTime += teammate.total ?? 0;
//     roleTimes[role].count += 1;
//   }

//   return Object.entries(roleTimes).map(([role, data]) => ({
//     role,
//     total: data.totalTime,
//     medium: Math.round(data.totalTime / data.count),
//   }));
// }

const AnalyticsDataHighlights = ({
  team,
  teammates,
}: {
  team: Analytics;
  teammates: AnalyticsTeammate[];
}) => {
  // const [fastestTeammate, slowestTeammate] = useMemo(() => {
  //   const fastest = Math.min(...teammates.map((teammate) => teammate.total ?? 0));
  //   const slowest = Math.max(...teammates.map((teammate) => teammate.total ?? 0));

  //   return [fastest, slowest];
  // }, [teammates]);

  // const [stats] = useState(getRoleTimeStats(teammates));

  // const { fastest, slowest } = useMemo(() => {
  //   const fastest = stats.reduce((min, curr) => (curr.total < min.total ? curr : min));
  //   const slowest = stats.reduce((max, curr) => (curr.medium > max.medium ? curr : max));

  //   return { fastest, slowest };
  // }, [stats]);

  // useEffect(() => {
  //   const valid = teammates.filter((t) => t.sync?.startedAt && t.sync?.finishedAt);

  //   if (valid.length === 0) return;

  //   const totalMs = valid.reduce(
  //     (acc, t) =>
  //       acc + (new Date(t.sync.finishedAt).getTime() - new Date(t.sync.startedAt).getTime()),
  //     0
  //   );

  //   const avgMs = totalMs / valid.length;
  //   const avgSec = Math.round(avgMs / 1000);

  //   setMinutes(Math.floor(avgSec / 60));
  //   setSeconds(avgSec % 60);
  // }, [teammates]);

  return (
    <div className="flex flex-col gap-4">
      <AverageTime team={team} teammates={teammates}></AverageTime>
      {/* <ul className="relative grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <li>
          <Card className="gap-4 p-4">
            <CardHeader className="gap-0 p-0">
              <CardTitle className="flex flex-col gap-2">
                <Rabbit className="text-emerald-500" />
                <span className="text-sm">Fastest</span>
              </CardTitle>
              <CardDescription>
                <NumberTicker startValue={0} value={128} />s The fastest teammate during this sync
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-0">
              <Avatar className="aspect-square size-8 border">
                <AvatarImage
                  className="bg-secondary object-cover"
                  src={fastestTeammate.avatar || undefined}
                />
                <AvatarFallback style={{ backgroundColor: fastestTeammate.color }}>
                  <span
                    className="scale-90 text-xs"
                    style={{ color: getContrastingColor(fastestTeammate.color) }}
                  >
                    {fastestTeammate.name.slice(0, 2).toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-sm">{fastestTeammate.name}</span>
                  <span className="text-muted-foreground text-sm">{fastestTeammate.role}</span>
                </div>
                <span className="text-lg font-semibold">
                  <TimeTicker total={128} timer={TIMER} />
                  {formatDuration(
                    new Date(fastestTeammate.sync.startedAt).getTime(),
                    new Date(fastestTeammate.sync.finishedAt).getTime()
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </li> */}
      {/* <li>
          <Card className="gap-4 p-4">
            <CardHeader className="gap-0 p-0">
              <CardTitle className="flex flex-col gap-2">
                <Snail />
                <span className="text-sm">Slowest</span>
              </CardTitle>
              <CardDescription>The slowest teammate during this sync</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2 p-0">
              <Avatar className="aspect-square size-8 border">
                <AvatarImage
                  className="bg-secondary object-cover"
                  src={slowestTeammate.avatar || undefined}
                />
                <AvatarFallback style={{ backgroundColor: slowestTeammate.color }}>
                  <span
                    className="scale-90 text-xs"
                    style={{ color: getContrastingColor(slowestTeammate.color) }}
                  >
                    {slowestTeammate.name.slice(0, 2).toUpperCase()}
                  </span>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-sm">{slowestTeammate.name}</span>
                  <span className="text-muted-foreground text-sm">{slowestTeammate.role}</span>
                </div>
                <span className="text-lg font-semibold">
                  {formatDuration(
                    new Date(slowestTeammate.sync.startedAt).getTime(),
                    new Date(slowestTeammate.sync.finishedAt).getTime()
                  )}
                </span>
              </div>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="gap-4 p-4">
            <CardHeader className="gap-0 p-0">
              <CardTitle className="flex flex-col gap-2">
                <Rabbit />
                <span className="text-sm">Fastest Role {fastest?.role}</span>
              </CardTitle>
              <CardDescription>The fastest teammate during this sync</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-0">
              <div className="flex flex-1 items-center justify-between gap-4">
                Total: {formatDuration2(fastest?.total ?? 0)}
              </div>
              <div className="flex flex-1 items-center justify-between gap-4">
                Medium: {formatDuration2(fastest?.medium ?? 0)}
              </div>
            </CardContent>
          </Card>
        </li>
        <li>
          <Card className="gap-4 p-4">
            <CardHeader className="gap-0 p-0">
              <CardTitle className="flex flex-col gap-2">
                <Rabbit />
                <span className="text-sm">Slowest Role {slowest?.role}</span>
              </CardTitle>
              <CardDescription>The slowest teammate during this sync</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-0">
              <div className="flex flex-1 items-center justify-between gap-4">
                Total: {formatDuration2(slowest?.total ?? 0)}
              </div>
              <div className="flex flex-1 items-center justify-between gap-4">
                Medium: {formatDuration2(slowest?.medium ?? 0)}
              </div>
            </CardContent>
          </Card>
        </li> 
      </ul> */}
    </div>
  );
};

export default AnalyticsDataHighlights;
