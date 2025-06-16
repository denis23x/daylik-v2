import type {
  AnalyticsTeammate,
  AnalyticsTeammateWithRelations,
} from '@/types/analyticsTeammate.type';

export function normalizeAnalyticsTeammates(
  data: AnalyticsTeammateWithRelations[]
): AnalyticsTeammate[] {
  return data.map((analytic) => {
    const { teammates: teammate, ...analyticTeammate } = analytic;

    return {
      ...analyticTeammate,
      teammate,
    };
  });
}
