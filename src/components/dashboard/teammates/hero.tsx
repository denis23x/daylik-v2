import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const TeammatesHero = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <Badge className="bg-primary rounded-full border-none py-1">Just released v1.0.0</Badge>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl md:leading-[1.2]">
          Teammates
        </h1>
        <p className="mt-6 text-base md:text-lg">
          Add, update, or remove teammates and assign them to teams to streamline collaboration.
          Keep your projects and resources organized by grouping related work together and
          maintaining a structured, efficient environment for your entire team.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/teams">Teams</Link>
          </Button>
          <Button className="cursor-pointer">
            <Plus /> Create Teammate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeammatesHero;
