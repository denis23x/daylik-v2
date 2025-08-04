import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const HomeTestimonials = () => {
  const t = useTranslations('components.home.testimonials');

  return (
    <div
      id="testimonials"
      className="min-h-screen-home relative container mx-auto flex flex-col items-center justify-center gap-14 px-4 py-14"
    >
      <span className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {t('title')}
      </span>
      <ul className="flex max-w-md flex-wrap justify-center gap-4 sm:max-w-screen-md sm:gap-6 lg:max-w-screen-lg">
        {/* Sophia Lee */}
        <li className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
          <div className="bg-accent size-full rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="aspect-square size-12">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={`/images/testimonials/${t('sophia-lee.avatar')}`}
                    alt={t('sophia-lee.avatarAlt')}
                    width={96}
                    height={96}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {t('sophia-lee.name').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{t('sophia-lee.name')}</p>
                  <p className="text-sm">{t('sophia-lee.designation')}</p>
                </div>
              </div>
              <Link
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                href={`https://x.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('sophia-lee.profileAriaLabel')}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground size-5"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            </div>
            <p className="mt-5 text-[17px]">{t('sophia-lee.testimonial')}</p>
          </div>
        </li>

        {/* John Doe */}
        <li className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
          <div className="bg-accent size-full rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="aspect-square size-12">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={`/images/testimonials/${t('john-doe.avatar')}`}
                    alt={t('john-doe.avatarAlt')}
                    width={96}
                    height={96}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {t('john-doe.name').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{t('john-doe.name')}</p>
                  <p className="text-sm">{t('john-doe.designation')}</p>
                </div>
              </div>
              <Link
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                href={`https://x.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('john-doe.profileAriaLabel')}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground size-5"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            </div>
            <p className="mt-5 text-[17px]">{t('john-doe.testimonial')}</p>
          </div>
        </li>

        {/* Emily Davis */}
        <li className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
          <div className="bg-accent size-full rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="aspect-square size-12">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={`/images/testimonials/${t('emily-davis.avatar')}`}
                    alt={t('emily-davis.avatarAlt')}
                    width={96}
                    height={96}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {t('emily-davis.name').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{t('emily-davis.name')}</p>
                  <p className="text-sm">{t('emily-davis.designation')}</p>
                </div>
              </div>
              <Link
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                href={`https://x.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('emily-davis.profileAriaLabel')}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground size-5"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            </div>
            <p className="mt-5 text-[17px]">{t('emily-davis.testimonial')}</p>
          </div>
        </li>

        {/* Michael Johnson */}
        <li className="hidden w-full md:block md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
          <div className="bg-accent size-full rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="aspect-square size-12">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={`/images/testimonials/${t('michael-johnson.avatar')}`}
                    alt={t('michael-johnson.avatarAlt')}
                    width={96}
                    height={96}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {t('michael-johnson.name').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{t('michael-johnson.name')}</p>
                  <p className="text-sm">{t('michael-johnson.designation')}</p>
                </div>
              </div>
              <Link
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                href={`https://x.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('michael-johnson.profileAriaLabel')}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground size-5"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            </div>
            <p className="mt-5 text-[17px]">{t('michael-johnson.testimonial')}</p>
          </div>
        </li>

        {/* Daniel Martinez */}
        <li className="hidden w-full md:block md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
          <div className="bg-accent size-full rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="aspect-square size-12">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={`/images/testimonials/${t('daniel-martinez.avatar')}`}
                    alt={t('daniel-martinez.avatarAlt')}
                    width={96}
                    height={96}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {t('daniel-martinez.name').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{t('daniel-martinez.name')}</p>
                  <p className="text-sm">{t('daniel-martinez.designation')}</p>
                </div>
              </div>
              <Link
                className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
                href={`https://x.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('daniel-martinez.profileAriaLabel')}
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-foreground size-5"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </Link>
            </div>
            <p className="mt-5 text-[17px]">{t('daniel-martinez.testimonial')}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HomeTestimonials;
