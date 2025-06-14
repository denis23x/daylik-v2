'use client';

import { Settings } from 'lucide-react';
import DashboardHero from '../hero';

const ProfileHero = () => {
  return (
    <DashboardHero
      title="Settings"
      description="Manage your personal settings and preferences. Update your settings, customize your experience, and keep your account details up to date for a smoother workflow."
      icon={<Settings />}
    ></DashboardHero>
  );
};

export default ProfileHero;
