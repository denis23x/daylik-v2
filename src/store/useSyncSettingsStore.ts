import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';

type SyncSettingsStore = {
  team: Team | null;
  teammates: Teammate[];
  timer: number;
  setTeam: (team: Team) => void;
  setTeammates: (teammates: Teammate[]) => void;
  setTimer: (timer: number) => void;
  shuffle: () => void;
  reset: () => void;
};

export const useSyncSettingsStore = create<SyncSettingsStore>((set, get) => ({
  team: null,
  teammates: [],
  timer: 60,
  setTeam: (team) => set({ team }),
  setTeammates: (teammates) => set({ teammates }),
  setTimer: (timer) => set({ timer }),
  shuffle: () => set({ teammates: [...get().teammates].sort(() => Math.random() - 0.5) }),
  reset: () =>
    set({
      team: null,
      teammates: [],
      timer: 60,
    }),
}));
