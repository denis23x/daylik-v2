import { differenceInSeconds, isDate } from 'date-fns';

type Duration = number | Date;

export function formatDuration(startOrDuration: Duration, endTimestamp?: Duration): string {
  let totalSeconds: number;

  if (endTimestamp !== undefined) {
    const start = isDate(startOrDuration) ? startOrDuration : new Date(startOrDuration);
    const end = isDate(endTimestamp) ? endTimestamp : new Date(endTimestamp);

    totalSeconds = differenceInSeconds(end, start);
  } else {
    totalSeconds =
      typeof startOrDuration === 'number'
        ? Math.floor(startOrDuration / 1000)
        : Math.floor(startOrDuration.getTime() / 1000);
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];

  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  if (seconds > 0 || minutes === 0) {
    parts.push(`${seconds}s`);
  }

  return parts.join(' ');
}
