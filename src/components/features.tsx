import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChartPie, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Engage with Your Audience',
    description:
      'Boost audience engagement with interactive features like polls, quizzes, and forms.',
  },
  {
    icon: Zap,
    title: 'Accelerate Growth',
    description:
      'Supercharge your growth by implementing strategies that drive results quickly and efficiently.',
  },
  {
    icon: ChartPie,
    title: 'Instant Insights',
    description:
      'Gain immediate, actionable insights with a quick glance, enabling fast decision-making.',
  },
];

const Features = () => {
  return (
    <div id="features" className="xs:py-20 mx-auto w-full max-w-screen-xl px-6 py-12">
      <h2 className="xs:text-4xl text-3xl font-bold tracking-tight sm:mx-auto sm:max-w-xl sm:text-center md:text-5xl md:leading-[3.5rem]">
        Boost Your Strategy with Smart Features
      </h2>
      <div className="xs:mt-14 mx-auto mt-8 grid w-full gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="flex flex-col overflow-hidden rounded-xl border shadow-none"
          >
            <CardHeader>
              <feature.icon />
              <h4 className="!mt-3 text-xl font-bold tracking-tight">{feature.title}</h4>
              <p className="text-muted-foreground xs:text-[17px] mt-1 text-sm">
                {feature.description}
              </p>
            </CardHeader>
            <CardContent className="mt-auto pb-0">
              <div className="bg-muted h-52 rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Features;
