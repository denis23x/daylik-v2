import type { Teammate } from '@/types/teammate.type';
import { create } from 'zustand';

type Mode = 'update' | 'insert';

interface TeammatesUpsertStore {
  isOpen: boolean;
  mode: Mode;
  teammate: Teammate | null;
  openModal: (mode: Mode, teammate?: Teammate) => void;
  closeModal: () => void;
}

export const useTeammatesUpsertStore = create<TeammatesUpsertStore>((set) => ({
  mode: 'insert',
  teammate: null,
  isOpen: false,
  openModal: (mode, teammate?) => set({ isOpen: true, mode, teammate: teammate || null }),
  closeModal: () => set({ isOpen: false, teammate: null }),
}));
