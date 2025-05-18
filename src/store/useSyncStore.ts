import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import type { TeammateWithState } from '@/types/teammateWithState.type';

type SyncStore = {
  team: Team | null;
  teammates: TeammateWithState[];
  setTeam: (team: Team) => void;
  setTeammates: (teammates: Teammate[]) => void;

  startedAt: number | null;
  finishedAt: number | null;
  startSync: () => void;
  finishSync: () => void;

  activeUUID: string | null;
  setActive: (uuid: string) => void;
  setActiveRandom: () => void;
  finishTeammate: (uuid: string) => void;

  shuffleTeammates: () => void;
};

export const useSyncStore = create<SyncStore>((set, get) => ({
  team: null,
  teammates: [],
  setTeam: (team) => set({ team }),
  setTeammates: (teammates) => {
    const teammatesWithState = teammates.map((teammate: Teammate) => {
      return {
        ...teammate,
        state: {
          status: 'idle' as const,
          startedAt: null,
          finishedAt: null,
        },
      };
    });
    set({ teammates: teammatesWithState });
  },

  startedAt: null,
  finishedAt: null,
  startSync: () => set({ startedAt: Date.now() }),
  finishSync: () => set({ finishedAt: Date.now() }),

  activeUUID: null,

  setActive: (uuid) => {
    const prev = get().activeUUID;
    const now = Date.now();
    if (prev && prev !== uuid) get().finishTeammate(prev);
    set((state) => ({
      activeUUID: uuid,
      teammates: state.teammates.map((t) =>
        t.UUID === uuid
          ? {
              ...t,
              state: {
                ...t.state,
                status: 'active',
                startedAt: t.state.startedAt ?? now,
              },
            }
          : t
      ),
    }));
  },

  setActiveRandom: () => {
    const state = get();
    const idle = state.teammates.filter((t) => t.state.status === 'idle');
    if (idle.length === 0) return;
    const random = idle[Math.floor(Math.random() * idle.length)].UUID;
    if (state.activeUUID) state.finishTeammate(state.activeUUID);
    state.setActive(random);
  },

  finishTeammate: (uuid) => {
    const now = Date.now();
    set((state) => ({
      activeUUID: state.activeUUID === uuid ? null : state.activeUUID,
      teammates: state.teammates.map((t) =>
        t.UUID === uuid
          ? {
              ...t,
              state: {
                ...t.state,
                status: 'done',
                finishedAt: now,
              },
            }
          : t
      ),
    }));
  },

  shuffleTeammates: () => set({ teammates: [...get().teammates].sort(() => Math.random() - 0.5) }),
}));
