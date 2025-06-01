import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TeammateWithState } from '@/types/teammateWithState.type';
import { formatDuration } from '@/utils/formatDuration';
import { getContrastingColor } from '@/utils/getContrastingColor';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown10, ArrowUp01, ArrowUpAZ } from 'lucide-react';
import { ArrowDownZA } from 'lucide-react';

const TIMER = 60;

export const columns: ColumnDef<TeammateWithState>[] = [
  {
    accessorKey: 'queue',
    header: () => {
      return 'Queue';
    },
    cell: () => {
      return <span className="text-sm">1</span>;
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="!p-0"
          variant="text"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
        >
          Teammate
          {isSorted === 'asc' ? <ArrowUpAZ /> : <ArrowDownZA />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const { name, avatar, color } = row.original;

      return (
        <div className="flex items-center gap-2">
          <Avatar className="aspect-square size-8 border">
            <AvatarImage className="bg-secondary object-cover" src={avatar || undefined} />
            <AvatarFallback style={{ backgroundColor: color }}>
              <span className="scale-90 text-xs" style={{ color: getContrastingColor(color) }}>
                {name.slice(0, 2).toUpperCase()}
              </span>
            </AvatarFallback>
          </Avatar>
          <span className="text-sm">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="!p-0"
          variant="text"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
        >
          Role
          {isSorted === 'asc' ? <ArrowUpAZ /> : <ArrowDownZA />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const { role } = row.original;

      return <span className="text-muted-foreground text-sm">{role}</span>;
    },
  },
  {
    accessorKey: 'timer',
    accessorFn: (row) => {
      return row.state.finishedAt && row.state.startedAt
        ? row.state.finishedAt - row.state.startedAt
        : null;
    },
    header: ({ column }) => {
      const isSorted = column.getIsSorted();

      return (
        <Button
          className="!p-0"
          variant="text"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
        >
          Time spent
          {isSorted === 'asc' ? <ArrowUp01 /> : <ArrowDown10 />}
        </Button>
      );
    },
    cell: ({ row }) => {
      const { startedAt, finishedAt } = row.original.state;

      return (
        <span className="text-sm">{formatDuration(startedAt as number, finishedAt as number)}</span>
      );
    },
  },
  {
    accessorKey: 'overtime',
    header: () => {
      return 'Overtime';
    },
    cell: ({ row }) => {
      const { startedAt, finishedAt } = row.original.state;

      // TODO: add timer here
      const overtime = finishedAt && startedAt ? (finishedAt - startedAt) / 1000 / TIMER : 0;
      const overtimeMinutes = overtime > 1 ? Number(overtime.toFixed()) : 0;

      return overtimeMinutes > 0 ? (
        <Badge className="scale-90 sm:scale-100" variant="destructive">
          Overtime {overtimeMinutes > 1 ? `x${overtimeMinutes.toFixed(0)}` : ''}
        </Badge>
      ) : (
        <Badge variant="secondary">On time</Badge>
      );
    },
  },
];
