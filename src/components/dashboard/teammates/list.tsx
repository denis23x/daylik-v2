import Image from 'next/image';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Founder & CEO',
    imageUrl:
      'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    name: 'Jane Doe',
    title: 'Engineering Manager',
    imageUrl:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    name: 'Bob Smith',
    title: 'Product Manager',
    imageUrl:
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    name: 'Peter Johnson',
    title: 'Frontend Developer',
    imageUrl:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    name: 'David Lee',
    title: 'Backend Developer',
    imageUrl:
      'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    name: 'Sarah Williams',
    title: 'Product Designer',
    imageUrl:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 7,
    name: 'Michael Brown',
    title: 'UX Researcher',
    imageUrl:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 8,
    name: 'Elizabeth Johnson',
    title: 'Customer Success',
    imageUrl:
      'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 9,
    name: 'John Doe',
    title: 'Founder & CEO',
    imageUrl:
      'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 10,
    name: 'Jane Doe',
    title: 'Engineering Manager',
    imageUrl:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 11,
    name: 'Bob Smith',
    title: 'Product Manager',
    imageUrl:
      'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 12,
    name: 'Peter Johnson',
    title: 'Frontend Developer',
    imageUrl:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 13,
    name: 'David Lee',
    title: 'Backend Developer',
    imageUrl:
      'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 14,
    name: 'Sarah Williams',
    title: 'Product Designer',
    imageUrl:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 15,
    name: 'Michael Brown',
    title: 'UX Researcher',
    imageUrl:
      'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 16,
    name: 'Elizabeth Johnson',
    title: 'Customer Success',
    imageUrl:
      'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const TeammatesList = () => {
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
        {teamMembers.map((member) => (
          <div key={member.id} className="text-center">
            <Image
              src={member.imageUrl}
              alt={member.name}
              className="bg-secondary mx-auto h-20 w-20 rounded-full object-cover"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeammatesList;
