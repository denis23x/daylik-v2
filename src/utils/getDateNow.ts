import dayjs from 'dayjs';
import { getDateISOString } from './getDateISOString';

export function getDateNow(isoString?: string): number {
  return dayjs(isoString || getDateISOString()).valueOf();
}
