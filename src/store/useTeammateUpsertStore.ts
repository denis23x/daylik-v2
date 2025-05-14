import type { Teammate } from '@/types/teammate.type';
import { create } from 'zustand';

type Mode = 'update' | 'insert';

interface TeammateUpsertStore {
  isOpen: boolean;
  mode: Mode;
  teammate: Teammate | null;
  openModal: (mode: Mode, teammate?: Teammate) => void;
  closeModal: () => void;
}

export const useTeammateUpsertStore = create<TeammateUpsertStore>((set) => ({
  mode: 'insert',
  teammate: null,
  isOpen: false,
  openModal: (mode, teammate?) => set({ isOpen: true, mode, teammate: teammate || null }),
  closeModal: () => set({ isOpen: false, teammate: null }),
}));
