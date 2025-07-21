import React from 'react';

const HomeStats = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-screen-xl py-12 text-center">
        <span className="text-4xl font-semibold md:text-5xl">Why Daylik?</span>
        <p className="mt-6 text-lg">After switching to Daylik...</p>

        <div className="mt-16 grid justify-center gap-x-12 gap-y-16 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          <div className="max-w-[20ch]">
            <span className="text-5xl font-semibold">89%</span>
            <p className="mt-6 text-lg">of teams communicate more effectively</p>
          </div>
          <div className="max-w-[20ch]">
            <span className="text-5xl font-semibold">94%</span>
            <p className="mt-6 text-lg">report increased focus and accountability</p>
          </div>
          <div className="max-w-[20ch]">
            <span className="text-5xl font-semibold">91%</span>
            <p className="mt-6 text-lg">say they spend less time in meetings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeStats;
