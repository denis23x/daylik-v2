import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { CircleCheck, PartyPopper } from 'lucide-react';
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
    name: 'Open Beta',
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
    buttonText: 'You’re One of the First',
    isPopular: true,
  },
  {
    name: 'Pro',
    price: 0,
    description: 'For growing teams who need more power and analytics.',
    features: [
      'Up to 5 teams',
      'Up to 50 teammates',
      'Unlimited syncs',
      'Advanced analytics',
      '90-day sync history',
    ],
    buttonText: 'Coming Soon',
  },
];

const HomePricing = () => {
  return (
    <div
      id="pricing"
      className="min-h-screen-home relative container mx-auto flex flex-col items-center justify-center px-4 py-14"
    >
      <span className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        Pricing
      </span>
      <ul className="mx-auto mt-16 grid max-w-screen-lg items-center gap-8 sm:grid-cols-4 lg:grid-cols-6">
        {plans.map((plan, index) => (
          <li
            key={plan.name}
            className={cn('justify-center transition-opacity duration-200 lg:col-span-2', {
              'order-2 hidden sm:col-span-2 sm:flex lg:order-1': index === 0,
              'order-1 flex sm:col-span-4 lg:order-2': index === 1,
              'order-3 hidden sm:col-span-2 sm:flex lg:order-3': index === 2,
              'opacity-25 hover:opacity-100': !plan.isPopular,
            })}
          >
            <div
              className={cn(
                'bg-card relative max-w-md rounded-lg border p-6 sm:max-w-[288px] sm:gap-6 md:max-w-[352px]',
                {
                  'border-primary dark:border-primary/15 border-[2px] py-10': plan.isPopular,
                }
              )}
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
                <Link
                  href="/signup"
                  aria-label={`Sign up for ${plan.name} plan - ${plan.buttonText}`}
                >
                  {plan.name === 'Open Beta' && <PartyPopper />}
                  {plan.buttonText}
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePricing;
