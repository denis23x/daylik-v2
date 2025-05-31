'use client';

import { ChartLine } from 'lucide-react';
import DashboardHero from '../hero';

const AnalyticsHero = () => {
  return (
    <DashboardHero
      title="Analytics"
      description="Review your daily sync analytics and team engagement. Gain insights from each session, track participation trends, and reflect on team dynamics to improve future collaboration."
      icon={<ChartLine />}
    ></DashboardHero>
  );
};

export default AnalyticsHero;
