import dayjs from 'dayjs';
import duration, { type Duration } from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function formatDuration(startOrDuration: number, endTimestamp?: number) {
  let dur: Duration;

  if (endTimestamp !== undefined) {
    const start = dayjs(startOrDuration);
    const end = dayjs(endTimestamp);
    const diffInSeconds = end.diff(start, 'second');

    dur = dayjs.duration(diffInSeconds, 'seconds');
  } else {
    dur = dayjs.duration(startOrDuration);
  }

  const minutes = dur.minutes();
  const seconds = dur.seconds();

  const parts = [];

  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }

  if (seconds > 0 || minutes === 0) {
    parts.push(`${seconds}s`);
  }

  return parts.join(' ');
}
