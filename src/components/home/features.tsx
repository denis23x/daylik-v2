import Image from 'next/image';

const features = [
  {
    title: 'Level Up Communication',
    description: 'Bring clarity and accountability into your team’s daily workflow.',
    image: '/images/features/pixeltrue-study-from-books.svg',
  },
  {
    title: 'Stay in Sync',
    description: 'Keep everyone aligned with fast and structured daily check-ins.',
    image: '/images/features/pixeltrue-business-meeting.svg',
  },
  {
    title: 'Understand Engagement',
    description: 'Visualize who’s active, who’s blocked, and what needs attention.',
    image: '/images/features/pixeltrue-data-analysis.svg',
  },
];

const HomeFeatures = () => {
  return (
    <div className="min-h-screen-hero relative container mx-auto flex flex-col items-center justify-center px-4">
      <span className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Drive Team Success
      </span>
      <div className="mx-auto mt-12 grid w-full max-w-md gap-x-6 gap-y-12 sm:max-w-screen-md sm:grid-cols-2 lg:max-w-screen-lg lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col gap-4 text-start sm:gap-6">
            <div className="relative">
              <Image
                src={feature.image}
                alt={feature.title}
                width={500}
                height={500}
                className="bg-muted aspect-[4/5] w-full rounded-xl"
              />
              <div className="text-muted-foreground/25 hover:text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 p-2 text-xs whitespace-nowrap transition-colors">
                Illustration by{' '}
                <a
                  href="https://icons8.com/illustrations/author/ARh4OKrFtdfC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Pixeltrue Ouch!
                </a>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-semibold tracking-tight">{feature.title}</span>
              <p className="text-muted-foreground mt-2 max-w-[25ch] text-[17px]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeatures;
