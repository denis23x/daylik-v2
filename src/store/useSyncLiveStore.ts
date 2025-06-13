import { create } from 'zustand';
import type { Team } from '@/types/team.type';
import type { Teammate } from '@/types/teammate.type';
import type { SyncTeammate } from '@/types/syncTeammate.type';
import type { SyncTeam } from '@/types/syncTeam.type';
import { fisherYatesShuffle } from '@/utils/fisherYatesShuffle';
import { useTimer } from '@/hooks/ui/useTimer';
import { useStopwatch } from '@/hooks/ui/useStopwatch';

type SyncLiveStore = {
  team: SyncTeam | null;
  teammates: SyncTeammate[];
  activeUUID: string | null;
  setTeam: (team: Team) => void;
  setTeammates: (teammates: Teammate[]) => void;
  setActive: (uuid: string) => void;
  setDone: (
    uuid: string,
    timer: ReturnType<typeof useTimer>,
    stopwatch: ReturnType<typeof useStopwatch>
  ) => void;
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
                status: 'committed',
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
  setDone: (uuid, timer, stopwatch) => {
    set((state) => ({
      activeUUID: null,
      teammates: state.teammates.map((teammate) => {
        switch (true) {
          case teammate.UUID === uuid:
            return {
              ...teammate,
              sync: {
                ...teammate.sync,
                // TODO: format
                elapsed: parseInt(timer.getElapsedMS().toString()),
                overtime: parseFloat(stopwatch.overtime.toFixed(1)),
                total: parseInt(timer.getTotalMS().toString()),
                paused: parseInt(timer.getPausedMS().toString()),
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
