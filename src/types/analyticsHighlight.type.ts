import type { AnalyticsTeammate } from './analyticsTeammate.type';

export type AnalyticsHighlight = AnalyticsTeammate & {
  icon: React.ReactNode;
  label: string;
  key: string;
  placeholder: boolean;
};
