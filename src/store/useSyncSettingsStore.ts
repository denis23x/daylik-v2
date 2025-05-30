import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';

type SyncSettingsStore = {
  team: Team | null;
  teammates: Teammate[];
  setTeam: (team: Team) => void;
  setTeammates: (teammates: Teammate[]) => void;
  shuffle: () => void;
  reset: () => void;
};

export const useSyncSettingsStore = create<SyncSettingsStore>((set, get) => ({
  team: null,
  teammates: [],
  setTeam: (team) => set({ team }),
  setTeammates: (teammates) => set({ teammates }),
  shuffle: () => set({ teammates: [...get().teammates].sort(() => Math.random() - 0.5) }),
  reset: () =>
    set({
      team: null,
      teammates: [],
    }),
}));
