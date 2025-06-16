import type { Analytics, AnalyticsTeamWithRelations } from '@/types/analytics.type';

export function normalizeAnalyticsTeams(data: AnalyticsTeamWithRelations[]): Analytics[] {
  return data.map((analytic) => {
    const { teams: team, ...analyticTeam } = analytic;

    return {
      ...analyticTeam,
      team,
    };
  });
}
