import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';

const TIMER = 60;

type SyncSettingsStore = {
  team: Team | null;
  teammates: Teammate[];
  timer: number;
  setTeam: (team: Team) => void;
  setTeammates: (teammates: Teammate[]) => void;
  setTimer: (timer: number) => void;
  reset: () => void;
};

export const useSyncSettingsStore = create<SyncSettingsStore>((set) => ({
  team: null,
  teammates: [],
  timer: TIMER,
  setTeam: (team) => set({ team }),
  setTeammates: (teammates) => set({ teammates }),
  setTimer: (timer) => set({ timer }),
  reset: () =>
    set({
      team: null,
      teammates: [],
      timer: TIMER,
    }),
}));
