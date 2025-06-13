import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import type { SyncTeam } from '@/types/syncTeam.type';
import { fisherYatesShuffle } from '@/utils/fisherYatesShuffle';

type SyncLiveStore = {
  team: SyncTeam | null;
  teammates: SyncTeammate[];
  activeUUID: string | null;
  setTeam: (team: Team) => void;
  setTeammates: (teammates: Teammate[]) => void;
  setActive: (uuid: string) => void;
  setRandom: () => void;
  setDone: (uuid: string, elapsed: number, overtime: number) => void;
  shuffle: () => void;
  reset: () => void;
};

export const useSyncLiveStore = create<SyncLiveStore>((set, get) => ({
  team: null,
  teammates: [],
  activeUUID: null,
  setTeam: (team) => set({ team }),
  setTeammates: (teammates) => {
    const syncTeammates = teammates.map((teammate: Teammate) => {
      return {
        ...teammate,
        sync: {
          order: null,
          elapsed: null,
          overtime: null,
          total: null,
          paused: null,
          status: 'idle' as const,
        },
      };
    });

    set({ teammates: syncTeammates });
  },
  setActive: (uuid) => {
    const state = get();
    const order = state.teammates.filter((teammate) => teammate.sync.order);

    set((state) => ({
      activeUUID: uuid,
      teammates: state.teammates.map((teammate) => {
        switch (true) {
          case teammate.sync.status === 'active':
            return {
              ...teammate,
              sync: {
                ...teammate.sync,
                status: 'done',
              },
            };
          case teammate.UUID === uuid:
            return {
              ...teammate,
              sync: {
                ...teammate.sync,
                order: order.length + 1,
                status: 'active',
              },
            };
          default:
            return teammate;
        }
      }),
    }));
  },
  setRandom: () => {
    const state = get();
    const idle = state.teammates.filter((teammate) => teammate.sync.status === 'idle');

    if (idle.length) {
      state.setActive(idle[Math.floor(Math.random() * idle.length)].UUID);
    }
  },
  setDone: (uuid) => {
    set((state) => ({
      activeUUID: null,
      teammates: state.teammates.map((teammate) => {
        switch (true) {
          case teammate.UUID === uuid:
            return {
              ...teammate,
              sync: {
                ...teammate.sync,
                // elapsed,
                // overtime,
                // total,
                // paused,
                status: 'done',
              },
            };
          default:
            return teammate;
        }
      }),
    }));
  },
  shuffle: () => {
    const original = get().teammates;

    let shuffled = fisherYatesShuffle(original);

    while (shuffled.every((t, i) => t === original[i])) {
      shuffled = fisherYatesShuffle(original);
    }

    set({ teammates: shuffled });
  },
  reset: () =>
    set({
      team: null,
      teammates: [],
      activeUUID: null,
    }),
}));
