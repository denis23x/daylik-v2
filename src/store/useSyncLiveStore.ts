import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import type { TeammateWithState } from '@/types/teammateWithState.type';

type SyncLiveStore = {
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
  setDone: (uuid: string) => void;
  shuffle: () => void;
  resetStore: () => void;
};

export const useSyncLiveStore = create<SyncLiveStore>((set, get) => ({
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
    const state = get();
    const prev = state.activeUUID;
    const now = Date.now();

    set((state) => ({
      activeUUID: uuid,
      teammates: state.teammates.map((teammate) => {
        switch (true) {
          case teammate.UUID === prev:
            return {
              ...teammate,
              state: {
                ...teammate.state,
                status: 'done',
                finishedAt: now,
              },
            };
          case teammate.UUID === uuid:
            return {
              ...teammate,
              state: {
                ...teammate.state,
                status: 'active',
                startedAt: now,
              },
            };
          default:
            return teammate;
        }
      }),
    }));
  },
  setActiveRandom: () => {
    const state = get();
    const idle = state.teammates.filter((teammate) => teammate.state.status === 'idle');

    if (idle.length) {
      state.setActive(idle[Math.floor(Math.random() * idle.length)].UUID);
    }
  },
  setDone: (uuid) => {
    const now = Date.now();

    set((state) => ({
      activeUUID: null,
      teammates: state.teammates.map((teammate) => {
        return teammate.UUID === uuid
          ? {
              ...teammate,
              state: {
                ...teammate.state,
                status: 'done',
                finishedAt: now,
              },
            }
          : teammate;
      }),
    }));
  },
  shuffle: () => set({ teammates: [...get().teammates].sort(() => Math.random() - 0.5) }),
  resetStore: () =>
    set({
      team: null,
      teammates: [],
      startedAt: null,
      finishedAt: null,
      activeUUID: null,
    }),
}));
