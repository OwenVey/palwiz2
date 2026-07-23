import type { ColumnDef, SortingState } from '@tanstack/react-table';
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> extends ComponentProps<'div'> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// oxlint-disable-next-line react/react-compiler
export function DataTable<TData, TValue>({ columns, data, ...rest }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
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
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}
