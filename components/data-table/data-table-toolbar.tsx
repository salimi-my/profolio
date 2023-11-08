'use client';

import { ReactNode } from 'react';
import { Table } from '@tanstack/react-table';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DeleteButton from '@/components/data-table/data-table-delete';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  AddButton?: ReactNode;
  page: string;
}

export function DataTableToolbar<TData>({
  table,
  options,
  AddButton,
  page
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex items-start md:items-center justify-between'>
      <div className='flex flex-col md:flex-row items-start md:flex-1 md:items-center gap-2 md:gap-0 md:space-x-2'>
        <div className='flex justify-between items-center h-[32px] rounded-md border border-input shadow-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-ring'>
          <MagnifyingGlassIcon className='h-4 w-4 mx-2 text-muted-foreground' />
          <Input
            placeholder='Search...'
            value={(table.getState().globalFilter as string) ?? ''}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className='h-8 w-[120px] lg:w-[250px] border-none shadow-none pl-0 focus-visible:ring-0'
          />
        </div>
        {page === 'qualification' && table.getColumn('type') && (
          <DataTableFacetedFilter
            column={table.getColumn('type')}
            title='Type'
            options={options}
          />
        )}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex flex-col-reverse md:flex-row items-center gap-2 md:gap-0 md:space-x-2'>
        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <DeleteButton table={table} page={page} />
        )}
        <DataTableViewOptions table={table} />
        {AddButton}
      </div>
    </div>
  );
}
