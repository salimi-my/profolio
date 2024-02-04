'use client';

import { z } from 'zod';
import Link from 'next/link';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Row } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AlertModal from '@/components/modals/alert-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const toolSchema = z.object({
  id: z.string(),
  image: z.string(),
  thumbnail: z.string(),
  name: z.string(),
  color: z.string()
});

interface CellActionsProps<TData> {
  row: Row<TData>;
}

export function CellActions<TData>({ row }: CellActionsProps<TData>) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const tool = toolSchema.parse(row.original);

  const onDelete = async () => {
    try {
      setLoading(true);

      await edgestore.publicImages.delete({
        url: tool.image
      });

      await axios.delete(`/api/tool/${tool.id}`);

      router.refresh();
      toast({
        variant: 'default',
        title: 'Success!',
        description: 'Data has been successfully deleted.'
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.error
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label='Open menu'
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' aria-hidden='true' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem className='hover:cursor-pointer' asChild>
            <Link href={`/admin/tool/${tool.id}`}>
              <Edit className='mr-2' size={14} />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='group hover:cursor-pointer'
            onClick={() => setOpen(true)}
          >
            <Trash2 className='mr-2 group-hover:text-destructive' size={14} />
            <span className='group-hover:text-destructive'>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
