import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  column: Column<TData, TValue>;
  title: ReactNode;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const sorted = column.getIsSorted();

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 px-1 gap-0.5"
        aria-label={typeof title === 'string' ? `Sort ${title}` : 'Sort column'}
        onClick={() => {
          column.toggleSorting();
        }}
      >
        <span className={sorted === false ? '' : 'text-primary-foreground'}>{title}</span>
        {sorted === 'desc' ? (
          <ArrowDown className="text-foreground" />
        ) : sorted === 'asc' ? (
          <ArrowUp className="text-foreground" />
        ) : (
          <ChevronsUpDown className="text-muted-foreground/50" />
        )}
      </Button>
    </div>
  );
}
