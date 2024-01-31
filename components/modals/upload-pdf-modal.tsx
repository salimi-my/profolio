'use client';

import { Resume } from '@prisma/client';
import { useEffect, useState } from 'react';

import { Modal } from '@/components/ui/modal';
import UploadPdfForm from '@/components/admin/upload-pdf-form';

interface UploadPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume | null;
}

export default function UploadPdfModal({
  isOpen,
  onClose,
  resume
}: UploadPdfModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title='Upload PDF'
      description='Update and upload your latest resume in PDF format.'
      isOpen={isOpen}
      onClose={onClose}
    >
      <UploadPdfForm onClose={onClose} resume={resume} />
    </Modal>
  );
}
