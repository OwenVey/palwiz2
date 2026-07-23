import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> extends ComponentProps<'div'> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// oxlint-disable-next-line react/react-compiler
export function DataTable<TData, TValue>({ columns, data, ...rest }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination,
    },
  });
  const [firstHeaderGroup] = table.getHeaderGroups();
  const groupStartColumnIds = new Set(
    firstHeaderGroup?.headers
      .slice(1)
      .map((header) => {
        const [firstLeafHeader] = header.getLeafHeaders();
        return firstLeafHeader?.column.id;
      })
      .filter((columnId): columnId is string => columnId !== undefined)
  );
  const currentPageSize = table.getState().pagination.pageSize;
  const rowCount = data.length;
  const firstRow = rowCount === 0 ? 0 : table.getState().pagination.pageIndex * currentPageSize + 1;
  const lastRow =
    rowCount === 0
      ? 0
      : Math.min(rowCount, table.getState().pagination.pageIndex * currentPageSize + table.getRowModel().rows.length);

  const getBoundaryClass = (columnId: string) => (groupStartColumnIds.has(columnId) ? 'border-l border-border' : '');

  return (
    <div {...rest}>
      <div className="overflow-hidden rounded-md border">
        <Table className="min-w-max">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const [firstLeafHeader] = header.getLeafHeaders();

                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={`${
                        header.subHeaders.length
                          ? 'bg-muted font-semibold text-muted-foreground'
                          : 'h-12 text-xs text-muted-foreground'
                      } ${getBoundaryClass(firstLeafHeader?.column.id ?? '')}`}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={getBoundaryClass(cell.column.id)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllLeafColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="bg-muted/50 grid grid-cols-3 items-center gap-4 p-4">
          <div className="flex items-center gap-2 ">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <Select
              value={String(currentPageSize)}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger size="sm" className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 50, 100].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground text-center">
            Showing <span className="font-semibold">{firstRow}</span> to{' '}
            <span className="font-semibold">{lastRow}</span> of <span className="font-semibold">{rowCount}</span>{' '}
            results
          </div>

          <div className="flex items-center gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
