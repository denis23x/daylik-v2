'use client';

import { CalendarCog } from 'lucide-react';
import DashboardHero from '../hero';

const ProfileHero = () => {
  return (
    <DashboardHero
      title="Profile"
      description="Manage your personal settings and preferences. Update your profile information, customize your experience, and keep your account details up to date for a smoother workflow."
      icon={<CalendarCog />}
    ></DashboardHero>
  );
};

export default ProfileHero;
