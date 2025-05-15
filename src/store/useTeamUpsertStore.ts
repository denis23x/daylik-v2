import type { Team } from '@/types/team.type';
import { create } from 'zustand';

type Mode = 'update' | 'insert';

interface TeamUpsertStore {
  isOpen: boolean;
  mode: Mode;
  team: Team | null;
  openModal: (mode: Mode, team?: Team) => void;
  closeModal: () => void;
}

export const useTeamUpsertStore = create<TeamUpsertStore>((set) => ({
  mode: 'insert',
  team: null,
  isOpen: false,
  openModal: (mode, team?) => set({ isOpen: true, mode, team: team || null }),
  closeModal: () => set({ isOpen: false, team: null }),
}));
