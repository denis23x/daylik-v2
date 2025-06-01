import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function formatDuration(startTimestamp: number, endTimestamp: number) {
  const start = dayjs(startTimestamp);
  const end = dayjs(endTimestamp);

  const diffInSeconds = end.diff(start, 'second');
  const dur = dayjs.duration(diffInSeconds, 'seconds');

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
