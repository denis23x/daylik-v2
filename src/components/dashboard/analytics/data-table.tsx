'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
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
import { columns } from './data-table/columns';
import type { AnalyticTeammate } from '@/types/analyticTeammate.type';
import type { Analytic } from '@/types/analytic.type';
import { formatDuration2 } from '@/utils/formatDuration2';

const AnalyticsDataTable = ({
  team,
  teammates,
}: {
  team: Analytic;
  teammates: AnalyticTeammate[];
}) => {
  const [totalRoles, setTotalRoles] = useState(0);
  const [totalTimer, setTotalTimer] = useState('');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'order', desc: false }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable<AnalyticTeammate>({
    data: teammates,
    columns: columns({ timer: team.timer }),
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
    const totalUniqueRoles = [...new Set(teammates.map((t) => t.teammate.role))];
    const getTotalSeconds = () => {
      return teammates.reduce((sum, teammate) => {
        return sum + Math.floor((teammate.finishedAt - teammate.startedAt) / 1000);
      }, 0);
    };

    setTotalRoles(totalUniqueRoles.length);
    setTotalTimer(formatDuration2(getTotalSeconds() * 1000));
  }, [teammates]);

  return (
    <div>
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
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.getSize(),
                      minWidth: header.column.columnDef.minSize,
                      maxWidth: header.column.columnDef.maxSize,
                    }}
                  >
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
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.columnDef.minSize,
                        maxWidth: cell.column.columnDef.maxSize,
                      }}
                    >
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
              <TableCell colSpan={2}></TableCell>
              <TableCell>{totalRoles} roles</TableCell>
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
