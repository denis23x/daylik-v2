import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import type { Sync } from '@/types/sync.type';
import { fisherYatesShuffle } from '@/utils/fisherYatesShuffle';

type SyncLiveStore = {
  team: Sync | null;
  teammates: SyncTeammate[];
  showRoles: boolean;
  activeUUID: string | null;
  setSyncStart: (team: Team, teammates: Teammate[], timer: number) => void;
  setSyncFinish: () => void;
  setActive: (uuid: string) => void;
  setRandom: () => void;
  setDone: (uuid: string, elapsed: number, overtime: number) => void;
  setShowRoles: (showRoles: boolean) => void;
  shuffle: () => void;
  reset: () => void;
};

export const useSyncLiveStore = create<SyncLiveStore>((set, get) => ({
  team: null,
  teammates: [],
  showRoles: false,
  activeUUID: null,
  setSyncStart: (team, teammates, timer) => {
    const syncTeam = {
      ...team,
      sync: {
        timer,
        startedAt: new Date().toISOString(),
        finishedAt: null,
      },
    };

    const syncTeammates = teammates.map((teammate: Teammate) => {
      return {
        ...teammate,
        sync: {
          order: null,
          elapsed: null,
          overtime: null,
          status: 'idle' as const,
          startedAt: null,
          finishedAt: null,
        },
      };
    });

    set({
      team: syncTeam,
      teammates: syncTeammates,
    });
  },
  setSyncFinish: () => {
    set((state) => ({
      team: state.team
        ? {
            ...state.team,
            sync: {
              ...state.team.sync,
              finishedAt: new Date().toISOString(),
            },
          }
        : null,
    }));
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
                startedAt: new Date().toISOString(),
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
  setDone: (uuid, elapsed, overtime) => {
    set((state) => ({
      activeUUID: null,
      teammates: state.teammates.map((teammate) => {
        switch (true) {
          case teammate.UUID === uuid:
            return {
              ...teammate,
              sync: {
                ...teammate.sync,
                elapsed,
                overtime,
                status: 'done',
                finishedAt: new Date().toISOString(),
              },
            };
          default:
            return teammate;
        }
      }),
    }));
  },
  setShowRoles: (showRoles: boolean) => set({ showRoles }),
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
      showRoles: false,
      activeUUID: null,
    }),
}));
