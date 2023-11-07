import axios from 'axios';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AlertModal from '@/components/modals/alert-modal';

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

  const handleClick = () => {
    console.log(
      table.getFilteredSelectedRowModel().flatRows.map((row) => row.original)
    );
  };

  const onDelete = async () => {
    try {
      setLoading(true);

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
      console.log(error);

      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
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
