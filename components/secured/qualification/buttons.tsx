'use client';

import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useQualificationModal } from '@/hooks/use-qualification-modal';

export function AddButton() {
  const qualificationModal = useQualificationModal();
  return (
    <Button
      size='sm'
      className='h-8'
      onClick={() => {
        qualificationModal.setTitle('Create Qualification');
        qualificationModal.setDescription(
          'Add more information on your qualification section.'
        );
        qualificationModal.setQualification(undefined);
        qualificationModal.onOpen();
      }}
    >
      <PlusCircle size={16} className='mr-2' />
      Create
    </Button>
  );
}
