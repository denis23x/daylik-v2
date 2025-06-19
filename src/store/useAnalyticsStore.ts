import { create } from 'zustand';
import type { Analytics } from '@/types/analytics.type';
import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';

type AnalyticsStore = {
  analytics: Analytics | null;
  analyticsTeammates: AnalyticsTeammate[];
  setAnalytics: (analytics: Analytics) => void;
  setAnalyticsTeammates: (analyticsTeammates: AnalyticsTeammate[]) => void;
};

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  analytics: null,
  analyticsTeammates: [],
  setAnalytics: (analytics) => set({ analytics }),
  setAnalyticsTeammates: (analyticsTeammates) => set({ analyticsTeammates }),
}));
