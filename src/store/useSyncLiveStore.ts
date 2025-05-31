import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import type { TeammateWithState } from '@/types/teammateWithState.type';

const TIMER = 60;

// TODO: move to utils
function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type SyncLiveStore = {
  team: Team | null;
  teammates: TeammateWithState[];
  timer: number;
  showRoles: boolean;
  startedAt: number | null;
  finishedAt: number | null;
  activeUUID: string | null;
  setSyncStart: (team: Team, teammates: Teammate[], timer: number) => void;
  setSyncFinish: () => void;
  setActive: (uuid: string) => void;
  setRandom: () => void;
  setDone: (uuid: string) => void;
  setShowRoles: (showRoles: boolean) => void;
  shuffle: () => void;
  reset: () => void;
};

export const useSyncLiveStore = create<SyncLiveStore>((set, get) => ({
  team: null,
  teammates: [],
  timer: TIMER,
  showRoles: false,
  startedAt: null,
  finishedAt: null,
  activeUUID: null,
  setSyncStart: (team, teammates, timer) => {
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

    set({
      team,
      teammates: teammatesWithState,
      timer,
      startedAt: Date.now(),
    });
  },
  setSyncFinish: () => set({ finishedAt: Date.now() }),
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
  setRandom: () => {
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
      timer: TIMER,
      showRoles: false,
      startedAt: null,
      finishedAt: null,
      activeUUID: null,
    }),
}));
