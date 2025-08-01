import { differenceInSeconds, isDate } from 'date-fns';
import Cookies from 'js-cookie';

type Duration = number | Date;

export function formatDuration(startOrDuration: Duration, endTimestamp?: Duration): string {
  const locale = Cookies.get('NEXT_LOCALE') || 'en';
  const localeMap = {
    de: {
      h: 'h',
      m: 'm',
      s: 's',
    },
    en: {
      h: 'h',
      m: 'm',
      s: 's',
    },
    es: {
      h: 'h',
      m: 'm',
      s: 's',
    },
    ru: {
      h: 'ч',
      m: 'м',
      s: 'с',
    },
  };

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
    parts.push(`${minutes}${localeMap[locale as keyof typeof localeMap].m}`);
  }

  if (seconds > 0 || minutes === 0) {
    parts.push(`${seconds}${localeMap[locale as keyof typeof localeMap].s}`);
  }

  return parts.join(' ');
}
