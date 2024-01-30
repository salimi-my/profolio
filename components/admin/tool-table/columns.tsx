'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';

import type { Tool } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CellActions } from '@/components/admin/tool-table/cell-actions';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';

export const columns: ColumnDef<Tool>[] = [
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
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Image' />
    ),
    cell: ({ row }) => (
      <Link
        href={row.getValue('image')}
        target='_blank'
        rel='noopener noreferrer'
        className='relative group flex w-12 h-12'
      >
        <Image
          src={row.original.thumbnail!}
          alt={row.original.name!}
          width={48}
          height={48}
          className='border rounded-md group-hover:border-zinc-400 dark:group-hover:border-zinc-600 object-cover object-center'
        />
      </Link>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='flex'>
        <span className='max-w-[150px] truncate font-medium'>
          {row.getValue('name')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Color' />
    ),
    cell: ({ row }) => <Badge variant='outline'>{row.getValue('color')}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => (
      <span className='flex max-w-[100px] truncate'>
        {format(row.getValue('createdAt'), 'dd MMM yyyy')}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellActions row={row} />
  }
];
