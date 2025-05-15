import type { Team } from '@/types/team.type';
import { create } from 'zustand';

type Mode = 'update' | 'insert';

interface TeamsUpsertStore {
  isOpen: boolean;
  mode: Mode;
  team: Team | null;
  openModal: (mode: Mode, team?: Team) => void;
  closeModal: () => void;
}

export const useTeamsUpsertStore = create<TeamsUpsertStore>((set) => ({
  mode: 'insert',
  team: null,
  isOpen: false,
  openModal: (mode, team?) => set({ isOpen: true, mode, team: team || null }),
  closeModal: () => set({ isOpen: false, team: null }),
}));
