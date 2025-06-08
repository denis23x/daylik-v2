import dayjs from 'dayjs';

export function getDateISOString(): string {
  return dayjs().millisecond(0).toISOString();
}
