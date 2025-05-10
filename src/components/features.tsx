const features = [
  {
    title: 'Identify Opportunities',
    description: 'Find untapped areas to explore effortlessly.',
  },
  {
    title: 'Build Authority',
    description: 'Craft content that resonates and inspires trust.',
  },
  {
    title: 'Instant Insights',
    description: 'Get actionable insights instantly at a glance.',
  },
];

const Features02Page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center py-12">
      <div className="w-full">
        <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Ignite Your Imagination
        </h2>
        <div className="mx-auto mt-10 grid w-full max-w-md gap-x-6 gap-y-12 px-6 sm:max-w-screen-md sm:grid-cols-2 lg:max-w-screen-lg lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col text-start">
              <div className="bg-muted mb-5 aspect-[4/5] w-full rounded-xl sm:mb-6" />
              <span className="text-2xl font-semibold tracking-tight">{feature.title}</span>
              <p className="text-muted-foreground mt-2 max-w-[25ch] text-[17px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features02Page;

// TODO: Remove this later
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { ChartPie, Users, Zap } from 'lucide-react';

// const features = [
//   {
//     icon: Users,
//     title: 'Engage with Your Audience',
//     description:
//       'Boost audience engagement with interactive features like polls, quizzes, and forms.',
//   },
//   {
//     icon: Zap,
//     title: 'Accelerate Growth',
//     description:
//       'Supercharge your growth by implementing strategies that drive results quickly and efficiently.',
//   },
//   {
//     icon: ChartPie,
//     title: 'Instant Insights',
//     description:
//       'Gain immediate, actionable insights with a quick glance, enabling fast decision-making.',
//   },
// ];

// const Features = () => {
//   return (
//     <div id="features" className="xs:py-20 mx-auto min-h-screen w-full max-w-screen-xl px-6 py-12">
//       <h2 className="xs:text-4xl text-3xl font-bold tracking-tight sm:mx-auto sm:max-w-xl sm:text-center md:text-5xl md:leading-[3.5rem]">
//         Boost Your Strategy with Smart Features
//       </h2>
//       <div className="xs:mt-14 mx-auto mt-8 grid w-full gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
//         {features.map((feature) => (
//           <Card
//             key={feature.title}
//             className="flex flex-col overflow-hidden rounded-xl border shadow-none"
//           >
//             <CardHeader>
//               <feature.icon />
//               <h4 className="!mt-3 text-xl font-bold tracking-tight">{feature.title}</h4>
//               <p className="text-muted-foreground xs:text-[17px] mt-1 text-sm">
//                 {feature.description}
//               </p>
//             </CardHeader>
//             <CardContent className="mt-auto pb-0">
//               <div className="bg-muted h-52 rounded-xl" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Features;
