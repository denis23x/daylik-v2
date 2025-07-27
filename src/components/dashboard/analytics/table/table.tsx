'use client';

import {
  Table,
  TableBody,
  TableCell,
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
import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { columns as baseColumns } from './columns';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import { Input } from '@/components/ui/input';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { useTranslations } from 'next-intl';

const AnalyticsTable = () => {
  const t = useTranslations('components.dashboard.analytics.table');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'order', desc: false }]);
  const [filter, setFilter] = useState('');
  const deferredFilter = useDeferredValue(filter);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { analyticsTeammates } = useAnalyticsStore();
  const columns = useMemo(() => baseColumns({ sorting, t }), [sorting, t]);
  const table = useReactTable<AnalyticsTeammate>({
    data: analyticsTeammates,
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
    table.getColumn('name')?.setFilterValue(deferredFilter.trim());
  }, [deferredFilter, table]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder={t('lookupPlaceholder')}
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        autoComplete="off"
        inputMode="text"
        spellCheck="false"
        autoCapitalize="none"
      />
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
                <TableCell colSpan={6}>
                  <p className="mx-auto flex max-w-md flex-col items-center justify-center py-8">
                    <span className="text-lg font-semibold">{filter}</span>
                    <span className="text-muted-foreground text-sm">{t('noTeammates')}</span>
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AnalyticsTable;
