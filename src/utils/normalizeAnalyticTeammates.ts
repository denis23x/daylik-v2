import type {
  AnalyticTeammate,
  AnalyticTeammateWithRelations,
} from '@/types/analyticTeammate.type';

export function normalizeAnalyticTeammates(
  data: AnalyticTeammateWithRelations[]
): AnalyticTeammate[] {
  return data.map((analytic) => {
    const { teammates: teammate, ...analyticTeammate } = analytic;

    return {
      ...analyticTeammate,
      teammate,
    };
  });
}
