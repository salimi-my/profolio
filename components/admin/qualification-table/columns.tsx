'use client';

import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import type { Qualification } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CellActions } from '@/components/admin/qualification-table/cell-actions';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';

export const columns: ColumnDef<Qualification>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => <Badge variant='outline'>{row.getValue('type')}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false
  },
  {
    accessorKey: 'degree',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Degree' />
    ),
    cell: ({ row }) => (
      <div className='flex'>
        <span className='max-w-[200px] truncate'>
          {row.getValue('degree') === '' ? 'N/A' : row.getValue('degree')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'school',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='School' />
    ),
    cell: ({ row }) => (
      <div className='flex'>
        <span className='max-w-[200px] truncate'>
          {row.getValue('school') === '' ? 'N/A' : row.getValue('school')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'position',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => (
      <div className='flex'>
        <span className='max-w-[200px] truncate'>
          {row.getValue('position') === '' ? 'N/A' : row.getValue('position')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'company',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Company' />
    ),
    cell: ({ row }) => (
      <div className='flex'>
        <span className='max-w-[200px] truncate'>
          {row.getValue('company') === '' ? 'N/A' : row.getValue('company')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'startYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start' />
    ),
    cell: ({ row }) => <span>{row.getValue('startYear')}</span>
  },
  {
    accessorKey: 'endYear',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End' />
    ),
    cell: ({ row }) => <span>{row.getValue('endYear')}</span>
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => format(row.getValue('createdAt'), 'dd MMM yyyy')
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions row={row} />
  }
];
