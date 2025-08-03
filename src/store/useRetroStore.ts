import { create } from 'zustand';

interface RetroStore {
  isOpen: boolean;
  mode: 'notes' | 'qr';
  openModal: (mode: 'notes' | 'qr') => void;
  closeModal: () => void;
}

export const useRetroStore = create<RetroStore>((set) => ({
  isOpen: false,
  mode: 'notes',
  openModal: (mode) => set({ isOpen: true, mode }),
  closeModal: () => set({ isOpen: false }),
}));
