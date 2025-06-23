import AvatarInitials from '@/components/avatar-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import type { Teammate } from '@/types/teammate.type';
import { formatDuration } from '@/utils/formatDuration';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { ArrowDown10, ArrowUp01, ArrowUpAZ } from 'lucide-react';
import { ArrowDownZA } from 'lucide-react';

export const columns = ({ sorting }: { sorting: SortingState }): ColumnDef<AnalyticsTeammate>[] => {
  return [
    {
      accessorKey: 'order',
      size: 32,
      minSize: 16,
      maxSize: 32,
      header: ({ column }) => {
        const [s] = sorting;
        const isSorted = column.getIsSorted();

        return (
          <Button
            className={`w-full !p-0 ${s.id === 'order' ? 'text-primary' : 'text-muted-foreground'}`}
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
      accessorFn: (row) => row.teammate?.name as string,
      header: ({ column }) => {
        const [s] = sorting;
        const isSorted = column.getIsSorted();

        return (
          <Button
            className={`!p-0 ${s.id === 'name' ? 'text-primary' : 'text-muted-foreground'}`}
            variant="text"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Teammate
            {isSorted === 'asc' ? <ArrowUpAZ /> : <ArrowDownZA />}
          </Button>
        );
      },
      cell: ({ row }) => {
        const { name, avatar, color } = row.original.teammate as Teammate;

        return (
          <div className="flex items-center gap-2">
            <Avatar className="aspect-square size-8 border">
              <AvatarImage className="bg-secondary object-cover" src={avatar || undefined} />
              <AvatarFallback style={{ backgroundColor: color }}>
                <AvatarInitials
                  className="scale-75 text-xs"
                  teammate={row.original.teammate as Teammate}
                />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      accessorFn: (row) => row.teammate?.role as string,
      header: ({ column }) => {
        const [s] = sorting;
        const isSorted = column.getIsSorted();

        return (
          <Button
            className={`!p-0 ${s.id === 'role' ? 'text-primary' : 'text-muted-foreground'}`}
            variant="text"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Role
            {isSorted === 'asc' ? <ArrowUpAZ /> : <ArrowDownZA />}
          </Button>
        );
      },
      cell: ({ row }) => {
        const { role } = row.original.teammate as Teammate;

        return <span className="text-muted-foreground text-sm">{role}</span>;
      },
    },
    {
      accessorKey: 'total',
      accessorFn: (row) => row.total,
      header: ({ column }) => {
        const [s] = sorting;
        const isSorted = column.getIsSorted();

        return (
          <Button
            className={`!p-0 ${s.id === 'total' ? 'text-primary' : 'text-muted-foreground'}`}
            variant="text"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Total
            {isSorted === 'asc' ? <ArrowUp01 /> : <ArrowDown10 />}
          </Button>
        );
      },
      cell: ({ row }) => {
        const { total } = row.original;

        return <span className="text-sm">{formatDuration(total as number)}</span>;
      },
    },
    {
      accessorKey: 'paused',
      accessorFn: (row) => row.paused,
      header: ({ column }) => {
        const [s] = sorting;
        const isSorted = column.getIsSorted();

        return (
          <Button
            className={`!p-0 ${s.id === 'paused' ? 'text-primary' : 'text-muted-foreground'}`}
            variant="text"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Paused
            {isSorted === 'asc' ? <ArrowUp01 /> : <ArrowDown10 />}
          </Button>
        );
      },
      cell: ({ row }) => {
        const { paused } = row.original;

        return paused && paused > 0 ? (
          <span className="text-sm">{formatDuration(paused as number)}</span>
        ) : (
          <span className="text-muted-foreground text-sm">-</span>
        );
      },
    },
    {
      accessorKey: 'overtime',
      accessorFn: (row) => row.overtime,
      header: ({ column }) => {
        const [s] = sorting;
        const isSorted = column.getIsSorted();

        return (
          <Button
            className={`!p-0 ${s.id === 'overtime' ? 'text-primary' : 'text-muted-foreground'}`}
            variant="text"
            onClick={() => column.toggleSorting(isSorted === 'asc')}
          >
            Overtimes
            {isSorted === 'asc' ? <ArrowUp01 /> : <ArrowDown10 />}
          </Button>
        );
      },
      cell: ({ row }) => {
        const { overtime } = row.original;

        return overtime && overtime > 0 ? (
          <Badge variant={overtime >= 1 ? 'destructive' : 'secondary'}>Overtime x{overtime}</Badge>
        ) : (
          <span className="text-muted-foreground text-sm">-</span>
        );
      },
    },
  ];
};
