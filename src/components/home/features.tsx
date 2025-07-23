import { cn } from '@/lib/utils';
import Image from 'next/image';

const features: Record<string, string>[] = [
  {
    title: 'Level Up Communication',
    description: 'Bring clarity and accountability into your team’s daily workflow.',
    image: '/images/features/pixeltrue-data-analysis.svg',
  },
  {
    title: 'Stay in Sync',
    description: 'Keep everyone aligned with fast and structured daily check-ins.',
    image: '/images/features/pixeltrue-business-meeting.svg',
  },
  {
    title: 'Understand Engagement',
    description: 'Visualize who’s active, who’s blocked, and what needs attention.',
    image: '/images/features/pixeltrue-support.svg',
  },
];

const HomeFeatures = () => {
  return (
    <div
      id="features"
      className="min-h-screen-home relative container mx-auto flex flex-col items-center justify-center gap-14 px-4 py-14"
    >
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Drive Team Success
      </h2>
      <ul className="mx-auto grid w-full max-w-md gap-x-6 gap-y-6 sm:max-w-screen-md sm:grid-cols-4 sm:gap-y-12 lg:max-w-screen-lg lg:grid-cols-6">
        {features.map((feature, index) => (
          <li
            key={feature.title}
            className={cn(
              'flex justify-center sm:col-span-2 lg:col-span-2',
              index === 2 && 'sm:col-span-4 lg:col-span-2'
            )}
          >
            <div className="flex flex-col gap-4 text-start sm:max-w-[292px] sm:gap-6 md:max-w-[365px] lg:max-w-full">
              <div className="relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={500}
                  height={500}
                  className={`bg-card aspect-[4/5] w-full rounded-xl border grayscale transition-all duration-200 hover:grayscale-0 ${
                    index === features.length - 1 && '-scale-x-100'
                  }`}
                />
                <div className="text-muted-foreground/25 hover:text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2 p-2 text-xs whitespace-nowrap transition-colors">
                  Illustration by{' '}
                  <a
                    href="https://icons8.com/illustrations/author/ARh4OKrFtdfC"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                    aria-label="Visit Pixeltrue's profile on Icons8 (opens in new tab)"
                  >
                    Pixeltrue Ouch!
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-2xl font-semibold tracking-tight">{feature.title}</span>
                <p className="text-muted-foreground mt-2 max-w-[25ch] text-[17px]">
                  {feature.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeFeatures;
