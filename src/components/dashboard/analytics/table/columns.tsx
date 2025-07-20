import AvatarInitials from '@/components/avatar-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import type { Teammate } from '@/types/teammate.type';
import { formatDuration } from '@/utils/formatDuration';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { ArrowDown10, ArrowUp01, ArrowUpAZ, ArrowDownZA } from 'lucide-react';
import { memo } from 'react';

const NameCell = memo(({ teammate }: { teammate: Teammate }) => (
  <div className="flex items-center gap-2">
    <Avatar className="aspect-square size-8 border">
      <AvatarImage className="bg-secondary object-cover" src={teammate.avatar || undefined} />
      <AvatarFallback style={{ backgroundColor: teammate.color }}>
        <AvatarInitials className="scale-75 text-xs" teammate={teammate} />
      </AvatarFallback>
    </Avatar>
    <span className="text-sm">{teammate.name}</span>
  </div>
));

NameCell.displayName = 'NameCell';

export const columns = ({ sorting }: { sorting: SortingState }): ColumnDef<AnalyticsTeammate>[] => [
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
    cell: ({ row }) => <span className="block text-center text-sm">{row.original.order}</span>,
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
    cell: ({ row }) => <NameCell teammate={row.original.teammate as Teammate} />,
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
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">{row.original.teammate?.role}</span>
    ),
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
    cell: ({ row }) => (
      <span className="text-sm">{formatDuration(row.original.total as number)}</span>
    ),
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
    cell: ({ row }) =>
      row.original.paused && row.original.paused > 0 ? (
        <span className="text-sm">{formatDuration(row.original.paused)}</span>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      ),
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
    cell: ({ row }) =>
      row.original.overtime && row.original.overtime > 0 ? (
        <Badge variant={row.original.overtime >= 1 ? 'destructive' : 'secondary'}>
          x{row.original.overtime}
        </Badge>
      ) : (
        <span className="text-muted-foreground text-sm">-</span>
      ),
  },
];
