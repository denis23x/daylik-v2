import type { Poker } from '@/types/poker.type';
import { PokerIssue } from '@/types/pokerIssues.type';
import { create } from 'zustand';

interface PokerStore {
  poker: Poker | null;
  issues: PokerIssue[];
  setPoker: (poker: Poker) => void;
  setIssues: (issues: PokerIssue[]) => void;
  reset: () => void;
}

export const usePokerStore = create<PokerStore>((set) => ({
  poker: null,
  issues: [],
  setPoker: (poker: Poker) => set({ poker }),
  setIssues: (issues: PokerIssue[]) => set({ issues }),
  reset: () => {
    set({
      poker: null,
      issues: [],
    });
  },
}));
