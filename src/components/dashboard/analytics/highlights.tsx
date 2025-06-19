'use client';

import Fastest from './highlights/fastest';
import FastestSquad from './highlights/fastest-squad';
import SlowestSquad from './highlights/slowest-squad';

const AnalyticsHighlights = () => {
  return (
    <div>
      <ul className="-m-2 grid grid-cols-2 grid-rows-2 [&_li]:p-2">
        <li className="col-span-1 row-span-2">
          <Fastest />
        </li>
        <li className="col-span-1">
          <FastestSquad />
        </li>
        <li className="col-span-1">
          <SlowestSquad />
        </li>
      </ul>

      {/* <ul className="-m-2 grid grid-cols-2 grid-rows-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 [&_li]:p-2">
        <li className="col-span-2 col-start-1 row-start-1 aspect-[2/1]">
          <AverageSync />
        </li>
        <li className="col-span-1 col-start-1 row-start-2 aspect-square">
          <Card className="size-full gap-4 p-4">
            <CardContent className="flex flex-col gap-2 p-0">
              <p className="text-sm">?</p>
            </CardContent>
          </Card>
        </li>
        <li className="col-span-1 col-start-2 row-start-2 aspect-square">
          <Card className="size-full gap-4 p-4">
            <CardContent className="flex flex-col gap-2 p-0">
              <p className="text-sm">?</p>
            </CardContent>
          </Card>
        </li>
        <li className="col-span-2 row-span-2 aspect-square sm:col-start-3 sm:row-start-1 md:col-start-3 md:row-start-1 lg:col-start-3 lg:row-start-1">
          <div className="flex size-full gap-4 pl-16">
            <Separator orientation="vertical" />
            <Fastest />
          </div>
        </li>
        <li className="col-span-2 aspect-[2/1] sm:col-start-1 sm:row-start-3 md:col-start-5 md:row-start-1 lg:col-start-5 lg:row-start-1">
          <FastestSquad />
        </li>
        <li className="col-span-2 aspect-[2/1] sm:col-start-1 sm:row-start-4 md:col-start-5 md:row-start-2 lg:col-start-5 lg:row-start-2">
          <SlowestSquad />
        </li>
        <li className="col-span-1 aspect-square sm:col-start-3 sm:row-start-3 md:col-start-1 md:row-start-3 lg:col-start-7 lg:row-start-1">
          <div className="size-full border">среднее время</div>
        </li>
        <li className="col-span-1 aspect-square sm:col-start-3 sm:row-start-4 md:col-start-1 md:row-start-4 lg:col-start-7 lg:row-start-2">
          <div className="size-full border">среднее пауза</div>
        </li>
        <li className="col-span-1 row-span-2 aspect-[1/2] sm:col-start-4 sm:row-start-3 md:col-start-3 md:row-start-3 lg:col-start-8 lg:row-start-1">
          <div className="size-full border">
            всего время
            <br />
            <br />
            всего паузы
            <br />
            <br />
            всего овертаймов
          </div>
        </li>
      </ul> */}
    </div>
  );
};

export default AnalyticsHighlights;
