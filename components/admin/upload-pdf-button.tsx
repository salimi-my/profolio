'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Resume } from '@prisma/client';

import { Button } from '@/components/ui/button';
import UploadPdfModal from '@/components/modals/upload-pdf-modal';

interface UploadPdfButtonProps {
  resume: Resume | null;
}

export default function UploadPdfButton({ resume }: UploadPdfButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size='sm' onClick={() => setOpen(true)}>
        <Upload className='mr-2 h-4 w-4' />
        Upload <span className='hidden sm:inline ml-1'>PDF</span>
      </Button>
      <UploadPdfModal
        isOpen={open}
        onClose={() => setOpen(false)}
        resume={resume}
      />
    </>
  );
}
