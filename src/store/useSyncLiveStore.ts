import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import type { TeammateWithState } from '@/types/teammateWithState.type';

const TIMER = 60;

type SyncLiveStore = {
  team: Team | null;
  teammates: TeammateWithState[];
  timer: number;
  showPositions: boolean;
  startedAt: number | null;
  finishedAt: number | null;
  activeUUID: string | null;
  setSyncStart: (team: Team, teammates: Teammate[], timer: number) => void;
  setSyncFinish: () => void;
  setActive: (uuid: string) => void;
  setActiveRandom: () => void;
  setDone: (uuid: string) => void;
  setShowPositions: (showPositions: boolean) => void;
  shuffle: () => void;
  reset: () => void;
};

export const useSyncLiveStore = create<SyncLiveStore>((set, get) => ({
  team: null,
  teammates: [],
  timer: TIMER,
  showPositions: false,
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
  setShowPositions: (showPositions: boolean) => set({ showPositions }),
  shuffle: () => set({ teammates: [...get().teammates].sort(() => Math.random() - 0.5) }),
  reset: () =>
    set({
      team: null,
      teammates: [],
      timer: TIMER,
      showPositions: false,
      startedAt: null,
      finishedAt: null,
      activeUUID: null,
    }),
}));
