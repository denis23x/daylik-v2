import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Basic access for individuals and small teams. Limited features.',
    features: [
      '1 team',
      'Up to 3 teammates',
      '5 syncs per week',
      'Basic analytics',
      '7-day sync history',
    ],
    buttonText: 'Coming Soon',
  },
  {
    name: 'Beta',
    price: 0,
    description: 'Full access during the beta period. All features unlocked for free.',
    features: [
      'Unlimited teams',
      'Unlimited teammates',
      'Unlimited syncs',
      'Advanced analytics',
      'Unlimited sync history',
      'Priority support',
    ],
    buttonText: 'You’re in Beta',
    isPopular: true,
  },
  {
    name: 'Pro',
    price: 0,
    description: 'For growing teams who need more power, automation, and analytics.',
    features: [
      'Up to 5 teams',
      'Up to 10 teammates per team',
      'Unlimited syncs',
      'Advanced analytics',
      '90-day sync history',
    ],
    buttonText: 'Coming Soon',
  },
];

const HomePricing = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <span className="text-center text-5xl font-bold tracking-tight">Pricing</span>
      <div className="mx-auto mt-12 grid max-w-screen-lg grid-cols-1 items-center gap-8 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn('relative rounded-lg border p-6', {
              'border-primary border-[2px] py-10': plan.isPopular,
            })}
          >
            {plan.isPopular && (
              <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                Active
              </Badge>
            )}
            <span className="text-lg font-medium">{plan.name}</span>
            {plan.price > 0 && <p className="mt-2 text-4xl font-bold">${plan.price}</p>}
            <p className="text-muted-foreground mt-4 font-medium">{plan.description}</p>
            <Separator className="my-4" />
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CircleCheck className="mt-1 h-4 w-4 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.isPopular ? 'default' : 'secondary'}
              size="lg"
              className="mt-6 w-full"
              asChild
            >
              <Link href="/signup">{plan.buttonText}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePricing;
