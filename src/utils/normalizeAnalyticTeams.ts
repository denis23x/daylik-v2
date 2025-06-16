import type { Analytics, AnalyticsTeamWithRelations } from '@/types/analytics.type';

export function normalizeAnalyticTeams(data: AnalyticsTeamWithRelations[]): Analytics[] {
  return data.map((analytic) => {
    const { teams: team, ...analyticTeam } = analytic;

    return {
      ...analyticTeam,
      team,
    };
  });
}
