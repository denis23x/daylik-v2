import type { Team } from '@/types/team';
import Image from 'next/image';

const TeamsList = ({ teams }: { teams: Team[] }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 grid w-full max-w-screen-lg grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
        {teams.map((team) => (
          <div key={team.id} className="text-center">
            <Image
              src={'images/placeholder.svg'}
              alt={team.name}
              className="bg-secondary mx-auto h-20 w-20 rounded-full object-cover"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{team.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
