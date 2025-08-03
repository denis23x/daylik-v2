import { create } from 'zustand';

type RetroMode = 'notes' | 'qr';

interface RetroStore {
  isOpen: boolean;
  mode: RetroMode;
  openModal: (mode: RetroMode) => void;
  closeModal: () => void;
}

export const useRetroStore = create<RetroStore>((set) => ({
  isOpen: false,
  mode: 'notes',
  openModal: (mode: RetroMode) => set({ isOpen: true, mode }),
  closeModal: () => set({ isOpen: false }),
}));
