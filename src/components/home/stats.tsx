import { Flame } from 'lucide-react';
import { RainbowButton } from '../magicui/rainbow-button';
import Link from 'next/link';

const HomeStats = () => {
  return (
    <div
      id="why"
      className="min-h-screen-home relative container mx-auto flex flex-col items-center justify-center gap-2 px-4 py-14"
    >
      <span className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Why Daylik?
      </span>
      <p className="text-muted-foreground text-lg">After switching to Daylik..</p>
      <ul className="my-12 grid justify-center gap-x-12 gap-y-16 sm:my-14 sm:grid-cols-4 lg:grid-cols-6">
        <li className="flex justify-center sm:col-span-2 lg:col-span-2">
          <div className="max-w-[20ch] text-center">
            <span className="text-5xl font-semibold">89%</span>
            <p className="text-muted-foreground mt-4 text-lg">
              of teams communicate more effectively
            </p>
          </div>
        </li>
        <li className="flex justify-center sm:col-span-2 lg:col-span-2">
          <div className="max-w-[20ch] text-center">
            <span className="text-5xl font-semibold">94%</span>
            <p className="text-muted-foreground mt-4 text-lg">
              report increased focus and accountability
            </p>
          </div>
        </li>
        <li className="flex justify-center sm:col-span-4 lg:col-span-2">
          <div className="max-w-[20ch] text-center">
            <span className="text-5xl font-semibold">91%</span>
            <p className="text-muted-foreground mt-4 text-lg">
              say they spend less time in meetings
            </p>
          </div>
        </li>
      </ul>
      <RainbowButton className="rounded-full" asChild>
        <Link href="/signup">
          Start your Sync
          <Flame />
        </Link>
      </RainbowButton>
    </div>
  );
};

export default HomeStats;
