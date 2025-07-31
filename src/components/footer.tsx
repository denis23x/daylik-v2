import { Link } from '@/i18n/navigation';
import { Logo } from './logo';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('components.footer');

  return (
    <footer className="bg-background/80 w-full border-t">
      <div className="container mx-auto flex flex-col items-start justify-between gap-4 p-4 md:flex-row">
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
                  href={t('legal.items.0.href')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t('legal.items.0.title')}
                </Link>
              </li>
              <li className="block">
                <Link
                  href={t('legal.items.1.href')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t('legal.items.1.title')}
                </Link>
              </li>
              <li className="block">
                <Link
                  href={t('legal.items.2.href')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {t('legal.items.2.title')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
