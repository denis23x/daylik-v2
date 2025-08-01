import type { AnalyticsTeammate } from '@/types/analyticsTeammate.type';
import { useTranslations } from 'next-intl';
import { v4 as uuidv4 } from 'uuid';

export function getHighlightsPlaceholder(key: string, t: ReturnType<typeof useTranslations>) {
  const role = () => {
    if (key === 'frozen-hero') return t('notFound.frozenHero');
    if (key === 'edgerunner') return t('notFound.edgerunner');
    if (key === 'mystery-ghost') return t('notFound.mysteryGhost');
    if (key === 'radio-tower') return t('notFound.radioTower');
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
      name: t('notFound.abbreviation'),
      role: role(),
      color: 'color-mix(in oklab, var(--secondary) 80%, transparent)',
      avatar: null,
      userUUID: uuidv4(),
      createdAt: new Date().toISOString(),
    },
  };

  return teammate;
}
