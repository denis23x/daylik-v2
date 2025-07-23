import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import { v4 as uuidv4 } from 'uuid';

export function getHighlightsPlaceholder(key: string) {
  const role = () => {
    if (key === 'frozen-hero') return 'No chill detected';
    if (key === 'edgerunner') return 'No close calls';
    if (key === 'mystery-ghost') return 'No ghosts spotted';
    if (key === 'radio-tower') return 'No radio today';
    return '';
  };

  const teammate: AnalyticsTeammate = {
    UUID: uuidv4(),
    analyticUUID: uuidv4(),
    teammateUUID: uuidv4(),
    order: 0,
    total: 0,
    paused: 0,
    overtime: 0,
    teammate: {
      UUID: uuidv4(),
      name: 'N/A',
      role: role(),
      color: 'color-mix(in oklab, var(--secondary) 80%, transparent)',
      avatar: null,
      userUUID: uuidv4(),
      createdAt: new Date().toISOString(),
    },
  };

  return teammate;
}
