'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading
}: AlertModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Are you sure?'
      description='Data will be deleted permanently and this action cannot be undone.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='pt-3 space-x-2 flex items-center justify-end w-full'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          {loading && (
            <>
              <Loader2 className='animate-spin mr-2' size={18} />
              Deleting...
            </>
          )}
          {!loading && <>Delete</>}
        </Button>
      </div>
    </Modal>
  );
}
