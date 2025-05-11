import { Badge } from '@/components/ui/badge';
import TeamsCreate from './create';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserRoundPlus } from 'lucide-react';

const TeamsHero = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <Badge className="bg-primary rounded-full border-none py-1">Just released v1.0.0</Badge>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.2]">Teams</h1>
        <p className="mt-6 text-base md:text-lg">
          Create, edit, or remove teams to organize your projects around specific goals or
          departments. Assign teammates to relevant teams, manage responsibilities, and maintain a
          structured workspace to improve coordination across your organization.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/teammates">
              <UserRoundPlus />
            </Link>
          </Button>
          <TeamsCreate />
        </div>
      </div>
    </div>
  );
};

export default TeamsHero;
