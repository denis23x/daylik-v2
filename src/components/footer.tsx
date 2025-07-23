import Link from 'next/link';
import { Logo } from './logo';

const footerSections = [
  {
    title: 'Guides',
    links: [
      {
        title: 'Ask for Help',
        href: '/guides/how-to-ask-for-help-without-feeling-dumb',
      },
      {
        title: 'Great Standup',
        href: '/guides/how-to-run-a-great-daily-standup',
      },
      {
        title: 'Handle Blockers',
        href: '/guides/how-to-flag-and-handle-blockers',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        title: 'Analytics',
        href: '/legal/analytics',
      },
      {
        title: 'Third Parties',
        href: '/legal/third-parties',
      },
      {
        title: 'Cookie Policy',
        href: '/legal/cookie-policy',
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-background/80 w-full border-t">
      <div className="container mx-auto flex flex-col items-start justify-between gap-4 p-4 md:flex-row">
        <div className="flex max-w-xs flex-col gap-4">
          <Logo />
          <p className="text-muted-foreground">
            Daylik is a efficient team management platform with synchronization and performance
            analytics.
          </p>
        </div>
        <div className="flex w-full flex-wrap gap-x-16 gap-y-4 md:flex-nowrap md:justify-end">
          {footerSections.map(({ title, links }) => (
            <nav className="flex flex-col gap-4" key={title}>
              <span className="font-semibold">{title}</span>
              <ul className="flex flex-col gap-2">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link href={href} className="text-muted-foreground hover:text-foreground">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
