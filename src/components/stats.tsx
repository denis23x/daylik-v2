import React from 'react';

const Stats01Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-screen-xl py-12 text-center">
        <span className="text-4xl font-semibold md:text-5xl">Why TypeForm?</span>
        <p className="mt-6 text-lg">Because after switching to us...</p>

        <div className="mt-16 grid justify-center gap-x-12 gap-y-16 sm:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          <div className="max-w-[18ch]">
            <span className="text-5xl font-semibold">96%</span>
            <p className="mt-6 text-lg">of customers say they have a better brand experience</p>
          </div>
          <div className="max-w-[18ch]">
            <span className="text-5xl font-semibold">95%</span>
            <p className="mt-6 text-lg">of customers say they gather more data, more easily</p>
          </div>
          <div className="max-w-[18ch]">
            <span className="text-5xl font-semibold">87%</span>
            <p className="mt-6 text-lg">of customers say they reveal deeper insights from data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats01Page;
