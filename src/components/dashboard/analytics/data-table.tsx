'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TeammateWithState } from '@/types/teammateWithState.type';
import { getContrastingColor } from '@/utils/getContrastingColor';
import { ArrowDown10, ArrowDownZA, ArrowUp01, ArrowUpAZ } from 'lucide-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import NotFound from '@/components/not-found';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Badge } from '@/components/ui/badge';

dayjs.extend(duration);

const TIMER = 60;

// TODO: move to utils
function formatDurationSimple(startTimestamp: number, endTimestamp: number) {
  const start = dayjs(startTimestamp);
  const end = dayjs(endTimestamp);

  const diffInSeconds = end.diff(start, 'second');
  const dur = dayjs.duration(diffInSeconds, 'seconds');

  const minutes = dur.minutes();
  const seconds = dur.seconds();

  const parts = [];
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || minutes === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}

const columns: ColumnDef<TeammateWithState>[] = [
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
        <span className="text-sm">
          {formatDurationSimple(startedAt as number, finishedAt as number)}
        </span>
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

const AnalyticsDataTable = ({
  teammates,
  timer,
}: {
  teammates: TeammateWithState[];
  timer: number;
}) => {
  const [totalTimer, setTotalTimer] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable<TeammateWithState>({
    data: teammates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    const earliestStart = Math.min(
      ...teammates.map((t) => t.state.startedAt).filter((t): t is number => t !== null)
    );
    const latestFinish = Math.max(
      ...teammates.map((t) => t.state.finishedAt).filter((t): t is number => t !== null)
    );

    setTotalTimer(formatDurationSimple(earliestStart, latestFinish));
  }, [teammates]);

  return (
    <div>
      <span>Timer {timer}</span>
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filter teammates..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filter role..."
          value={(table.getColumn('role')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('role')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <NotFound className="mx-auto py-8" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>N teammates</TableCell>
              <TableCell>N roles</TableCell>
              <TableCell>{totalTimer}</TableCell>
              <TableCell>N Оvertimes</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default AnalyticsDataTable;
