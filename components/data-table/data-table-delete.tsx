import { z } from 'zod';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Table } from '@tanstack/react-table';

import { useEdgeStore } from '@/lib/edgestore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AlertModal from '@/components/modals/alert-modal';

export const portfolioSchema = z.object({
  id: z.string(),
  image: z.string(),
  thumbnail: z.string(),
  title: z.string(),
  description: z.string(),
  githubUrl: z.string(),
  demoUrl: z.string()
});

interface DataTableDeleteProps<TData> {
  table: Table<TData>;
  page: string;
}

export default function DataTableDelete<TData>({
  table,
  page
}: DataTableDeleteProps<TData>) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { edgestore } = useEdgeStore();

  const onDelete = async () => {
    try {
      setLoading(true);

      if (page === 'portfolio') {
        await Promise.all(
          table.getFilteredSelectedRowModel().flatRows.map(async (row) => {
            const portfolio = portfolioSchema.parse(row.original);
            return await edgestore.publicImages.delete({
              url: portfolio.image
            });
          })
        );
      }

      await axios.post(
        `/api/${page}/delete-multiple`,
        table.getFilteredSelectedRowModel().flatRows.map((row) => row.original)
      );

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
      <Button variant='destructive' size='sm' onClick={() => setOpen(true)}>
        <Trash size={16} className='mr-2' />
        Delete
      </Button>
    </>
  );
}
