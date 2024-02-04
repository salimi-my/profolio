'use client';

import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import DownloadCvForm from '@/components/landing/download-cv-form';

export default function DownloadCvButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='outline' onClick={() => setOpen(true)}>
        Download CV
      </Button>
      <Modal
        title='Download CV'
        description='Fill in the form below and download link will be sent to your email.'
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <DownloadCvForm onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
