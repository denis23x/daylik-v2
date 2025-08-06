import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('components.footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background/80 w-full border-t">
      <div className="container mx-auto flex flex-col items-start justify-between gap-4 p-4">
        <div className="flex w-full flex-col items-start justify-between gap-4 md:flex-row">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          <div className="flex w-full flex-wrap gap-x-16 gap-y-4 md:flex-nowrap md:justify-end">
            <nav className="flex flex-col gap-4">
              <span className="font-semibold">{t('legal.title')}</span>
              <ul className="flex flex-col gap-2">
                <li className="block">
                  <Link
                    href="/legal/cookies-policy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t('legal.items.cookies.title')}
                  </Link>
                </li>
                <li className="block">
                  <Link
                    href="/legal/privacy-policy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t('legal.items.privacy.title')}
                  </Link>
                </li>
                <li className="block">
                  <Link
                    href="/legal/terms-and-conditions"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t('legal.items.terms.title')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="text-muted-foreground dark:bg-muted/50 bg-muted w-full">
        <div className="container mx-auto px-4 py-2 text-xs md:text-center">
          Daylik © 2024 - {currentYear}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
