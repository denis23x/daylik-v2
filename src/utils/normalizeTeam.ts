import type { Analytics } from '@/types/analytics.type';
import type { Team } from '@/types/team.type';

type AnalyticsWithRelations = Analytics & {
  teams?: Team;
};

export function normalizeTeam(data: AnalyticsWithRelations | null): Analytics | null {
  if (data) {
    const { teams, ...analyticsData } = data;

    return { ...analyticsData, team: teams };
  } else {
    return null;
  }
}
