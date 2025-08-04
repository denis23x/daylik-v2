import { endOfMonth, startOfMonth } from 'date-fns';

export function getCurrentMonthRange(now: Date = new Date()): { from: string; to: string } {
  const from = startOfMonth(now).toISOString();
  const to = endOfMonth(now).toISOString();

  return { from, to };
}
