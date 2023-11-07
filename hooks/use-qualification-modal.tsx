import { create } from 'zustand';
import type { Qualification } from '@prisma/client';

interface useQualificationModalStore {
  title: string;
  description: string;
  qualification: Partial<Qualification> | undefined;
  isOpen: boolean;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setQualification: (value: Partial<Qualification> | undefined) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useQualificationModal = create<useQualificationModalStore>(
  (set) => ({
    title: '',
    description: '',
    qualification: undefined,
    isOpen: false,
    setTitle: (value: string) => set({ title: value }),
    setDescription: (value: string) => set({ description: value }),
    setQualification: (value: Partial<Qualification> | undefined) =>
      set({ qualification: value }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  })
);
