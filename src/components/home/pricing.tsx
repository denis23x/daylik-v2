import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CircleCheck, PartyPopper } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const HomePricing = () => {
  const t = useTranslations('components.home.pricing');

  return (
    <div
      id="pricing"
      className="min-h-screen-home relative container mx-auto flex flex-col items-center justify-center px-4 py-14"
    >
      <span className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {t('title')}
      </span>
      <ul className="mx-auto mt-16 grid max-w-screen-lg items-center gap-8 sm:grid-cols-4 lg:grid-cols-6">
        {/* Free Plan */}
        <li className="order-2 hidden justify-center opacity-25 transition-opacity duration-200 hover:opacity-100 sm:col-span-2 sm:flex lg:order-1 lg:col-span-2">
          <div className="bg-card relative max-w-md rounded-lg border p-6 sm:max-w-[288px] sm:gap-6 md:max-w-[352px]">
            <span className="text-lg font-medium">{t('free.name')}</span>
            <p className="text-muted-foreground mt-4 font-medium">{t('free.description')}</p>
            <Separator className="my-4" />
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('free.features.teams')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('free.features.teammates')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('free.features.syncs')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('free.features.analytics')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('free.features.history')}
              </li>
            </ul>
            <Button variant="secondary" size="lg" className="mt-6 w-full" asChild>
              <Link
                href="/signup"
                aria-label={`Sign up for ${t('free.name')} plan - ${t('free.buttonText')}`}
              >
                {t('free.buttonText')}
              </Link>
            </Button>
          </div>
        </li>

        {/* Beta Plan */}
        <li className="order-1 flex justify-center transition-opacity duration-200 sm:col-span-4 lg:order-2 lg:col-span-2">
          <div className="bg-card border-primary dark:border-primary/15 relative max-w-md rounded-lg border-[2px] p-6 py-10 sm:max-w-[288px] sm:gap-6 md:max-w-[352px]">
            <Badge className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
              {t('beta.badge')}
            </Badge>
            <span className="text-lg font-medium">{t('beta.name')}</span>
            <p className="text-muted-foreground mt-4 font-medium">{t('beta.description')}</p>
            <Separator className="my-4" />
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('beta.features.teams')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('beta.features.teammates')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('beta.features.syncs')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('beta.features.analytics')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('beta.features.history')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('beta.features.support')}
              </li>
            </ul>
            <Button variant="default" size="lg" className="mt-6 w-full" asChild>
              <Link
                href="/signup"
                aria-label={`Sign up for ${t('beta.name')} plan - ${t('beta.buttonText')}`}
              >
                <PartyPopper />
                {t('beta.buttonText')}
              </Link>
            </Button>
          </div>
        </li>

        {/* Pro Plan */}
        <li className="order-3 hidden justify-center opacity-25 transition-opacity duration-200 hover:opacity-100 sm:col-span-2 sm:flex lg:order-3 lg:col-span-2">
          <div className="bg-card relative max-w-md rounded-lg border p-6 sm:max-w-[288px] sm:gap-6 md:max-w-[352px]">
            <span className="text-lg font-medium">{t('pro.name')}</span>
            <p className="text-muted-foreground mt-4 font-medium">{t('pro.description')}</p>
            <Separator className="my-4" />
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('pro.features.teams')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('pro.features.teammates')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('pro.features.syncs')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('pro.features.analytics')}
              </li>
              <li className="flex items-start gap-2">
                <CircleCheck className="mt-1 h-4 w-4 min-w-4 text-green-600" />
                {t('pro.features.history')}
              </li>
            </ul>
            <Button variant="secondary" size="lg" className="mt-6 w-full" asChild>
              <Link
                href="/signup"
                aria-label={`Sign up for ${t('pro.name')} plan - ${t('pro.buttonText')}`}
              >
                {t('pro.buttonText')}
              </Link>
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HomePricing;
