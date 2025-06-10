import dayjs from 'dayjs';

export function getDateISOString(): string {
  return dayjs().toISOString();
}
