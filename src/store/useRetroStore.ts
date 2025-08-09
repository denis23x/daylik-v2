import type { Retro } from '@/types/retro.type';
import { create } from 'zustand';

type RetroMode = 'notes' | 'qr';

interface RetroStore {
  retros: Retro[];
  isOpen: boolean;
  mode: RetroMode;
  active: string | null;
  setActive: (UUID: string) => void;
  setUpdate: (UUID: string, retro: Partial<Retro>) => void;
  setRetros: (retros: Retro[]) => void;
  openModal: (mode: RetroMode) => void;
  closeModal: () => void;
  reset: () => void;
}

export const useRetroStore = create<RetroStore>((set) => ({
  retros: [],
  isOpen: false,
  mode: 'notes',
  active: null,
  setActive: (UUID) => set({ active: UUID }),
  setUpdate: (UUID: string, retro: Partial<Retro>) => {
    set((state) => ({
      retros: state.retros.map((r: Retro) => {
        if (r.UUID === UUID) {
          return {
            ...r,
            ...retro,
          };
        }

        return r;
      }),
    }));
  },
  setRetros: (retros: Retro[]) => set({ retros }),
  openModal: (mode: RetroMode) => set({ isOpen: true, mode }),
  closeModal: () => set({ isOpen: false }),
  reset: () => {
    set({
      retros: [],
      isOpen: false,
      mode: 'notes',
      active: null,
    });
  },
}));
