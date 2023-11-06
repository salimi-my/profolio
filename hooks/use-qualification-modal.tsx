import { create } from 'zustand';

interface useQualificationModalStore {
  title: string;
  description: string;
  isOpen: boolean;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useQualificationModal = create<useQualificationModalStore>(
  (set) => ({
    title: '',
    description: '',
    isOpen: false,
    setTitle: (value: string) => set({ title: value }),
    setDescription: (value: string) => set({ description: value }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
  })
);
