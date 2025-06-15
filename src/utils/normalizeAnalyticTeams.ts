import type { AnalyticTeam, AnalyticTeamWithRelations } from '@/types/analyticTeam.type';

export function normalizeAnalyticTeams(data: AnalyticTeamWithRelations[]): AnalyticTeam[] {
  return data.map((analytic) => {
    const { teams: team, ...analyticTeam } = analytic;

    return {
      ...analyticTeam,
      team,
    };
  });
}
