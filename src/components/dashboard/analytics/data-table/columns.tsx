import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AnalyticTeammate } from '@/types/analyticTeammate.type';
import { formatDuration } from '@/utils/formatDuration';
import { getContrastingColor } from '@/utils/getContrastingColor';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown10, ArrowUp01, ArrowUpAZ } from 'lucide-react';
import { ArrowDownZA } from 'lucide-react';

export const columns = ({ timer }: { timer: number }): ColumnDef<AnalyticTeammate>[] => {
  return [
    {
      accessorKey: 'order',
      size: 16,
      minSize: 16,
      maxSize: 16,
      header: ({ column }) => {
        const isSorted = column.getIsSorted();

        return (
          <Button
            className="!p-0"
            variant="text"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            {isSorted === 'asc' ? <ArrowUp01 /> : <ArrowDown10 />}
          </Button>
        );
      },
      cell: ({ row }) => {
        const { order } = row.original;

        return <span className="block text-center text-sm">{order}</span>;
      },
    },
    {
      accessorKey: 'name',
      accessorFn: (row) => row.teammate.name,
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
        const { name, avatar, color } = row.original.teammate;

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
      accessorFn: (row) => row.teammate.role,
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
        const { role } = row.original.teammate;

        return <span className="text-muted-foreground text-sm">{role}</span>;
      },
    },
    {
      accessorKey: 'timer',
      accessorFn: (row) => row.finishedAt - row.startedAt,
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
        const { startedAt, finishedAt } = row.original;

        return <span className="text-sm">{formatDuration(startedAt, finishedAt)}</span>;
      },
    },
    {
      accessorKey: 'overtime',
      header: () => {
        return 'Overtime';
      },
      cell: ({ row }) => {
        const { startedAt, finishedAt } = row.original;

        const diffInSeconds = (finishedAt - startedAt) / 1000;
        const overtimes = diffInSeconds / timer;

        return overtimes > 0 ? (
          <Badge className="scale-90 sm:scale-100" variant="destructive">
            Overtime {overtimes > 1 ? `x${overtimes}` : ''}
          </Badge>
        ) : (
          <Badge variant="secondary">On time</Badge>
        );
      },
    },
  ];
};
