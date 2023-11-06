'use client';

import { Modal } from '@/components/ui/modal';
import { useQualificationModal } from '@/hooks/use-qualification-modal';

export default function QualificationModal() {
  const qualificationModal = useQualificationModal();

  return (
    <Modal
      title={qualificationModal.title}
      description={qualificationModal.description}
      isOpen={qualificationModal.isOpen}
      onClose={qualificationModal.onClose}
    >
      test
    </Modal>
  );
}
