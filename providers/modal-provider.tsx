'use client';

import { useEffect, useState } from 'react';

import QualificationModal from '@/components/modals/qualification-modal';

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <QualificationModal />
    </>
  );
}
