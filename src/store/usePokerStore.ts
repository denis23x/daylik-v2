import type { Poker } from '@/types/poker.type';
import { create } from 'zustand';

interface PokerStore {
  poker: Poker | null;
  setPoker: (poker: Poker) => void;
  reset: () => void;
}

export const usePokerStore = create<PokerStore>((set) => ({
  poker: null,
  setPoker: (poker: Poker) => set({ poker }),
  reset: () => {
    set({
      poker: null,
    });
  },
}));
