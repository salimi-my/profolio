'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import type { Portfolio } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CellActions } from '@/components/secured/portfolio/cell-actions';
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';

export const columns: ColumnDef<Portfolio>[] = [
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
        className='relative group flex w-24 h-24'
      >
        <Image
          src={row.original.thumbnail!}
          alt='portfolio image'
          fill
          className='border rounded-md group-hover:border-zinc-400 dark:group-hover:border-zinc-600 object-cover object-top'
        />
      </Link>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => (
      <div className='flex'>
        <span className='max-w-[150px] truncate font-medium'>
          {row.getValue('title')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => (
      <div className='flex'>
        <span className='w-[250px]'>{row.getValue('description')}</span>
      </div>
    )
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tags' />
    ),
    cell: ({ row }: any) => (
      <div className='block space-y-1'>
        {row.getValue('tags').map((tag: any) => (
          <div key={tag.id}>
            <Badge variant='outline'>{tag.name}</Badge>
          </div>
        ))}
      </div>
    ),
    enableSorting: false
  },
  {
    accessorKey: 'githubUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='GitHub' />
    ),
    cell: ({ row }) => (
      <Button variant='link' className='px-0'>
        <Link
          href={row.getValue('githubUrl')}
          target='_blank'
          rel='noopener noreferrer'
          className='max-w-[150px] truncate'
        >
          {row.getValue('githubUrl')}
        </Link>
      </Button>
    )
  },
  {
    accessorKey: 'demoUrl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Demo' />
    ),
    cell: ({ row }) => (
      <Button variant='link' className='px-0'>
        <Link
          href={row.getValue('demoUrl')}
          target='_blank'
          rel='noopener noreferrer'
          className='max-w-[150px] truncate'
        >
          {row.getValue('demoUrl')}
        </Link>
      </Button>
    )
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
