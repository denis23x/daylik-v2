import { Teammate } from '@/types/teammate';
import Image from 'next/image';

const TeammatesList = ({ teammates }: { teammates: Teammate[] }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 max-w-xl text-center">
        <b className="text-muted-foreground text-center text-base font-semibold">
          We&apos;re hiring!
        </b>
        <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Meet Our Team</h2>
        <p className="mt-4 text-base sm:text-lg">
          Our philosophy is simple — hire a team of diverse, passionate people and foster a culture
          that empowers you to do you best work.
        </p>
      </div>
      <div className="mx-auto mt-20 grid w-full max-w-screen-lg grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4">
        {teammates.map((member) => (
          <div key={member.id} className="text-center">
            <Image
              src={'images/placeholder.svg'}
              alt={member.name}
              className="bg-secondary mx-auto h-20 w-20 rounded-full object-cover"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeammatesList;
