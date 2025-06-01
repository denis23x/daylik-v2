import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export function formatDuration2(durationMs: number) {
  const dur = dayjs.duration(durationMs);

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
