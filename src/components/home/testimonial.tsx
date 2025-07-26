import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Sophia Lee',
    designation: 'Engineering Lead',
    testimonial:
      'Daylik completely transformed how our team handles daily updates. No more chaos — just clarity.',
    avatar: '/images/testimonials/avatar-1.jpeg',
  },
  {
    id: 2,
    name: 'John Doe',
    designation: 'Data Analyst',
    testimonial:
      'The analytics give me exactly what I need — clear trends and insights without the noise.',
    avatar: '/images/testimonials/avatar-2.jpeg',
  },
  {
    id: 3,
    name: 'Emily Davis',
    designation: 'Scrum Master',
    testimonial:
      'The easiest onboarding experience we’ve had. Our daily check-ins are now automated and transparent.',
    avatar: '/images/testimonials/avatar-3.jpeg',
  },
  {
    id: 4,
    name: 'Michael Johnson',
    designation: 'Product Manager',
    testimonial: 'We’ve seen a huge boost in accountability and focus thanks to Daylik.',
    avatar: '/images/testimonials/avatar-4.jpeg',
  },
  {
    id: 5,
    name: 'Daniel Martinez',
    designation: 'Software Engineer',
    testimonial:
      'The best tool we’ve added to our workflow. Lightweight, powerful, and incredibly easy to use.',
    avatar: '/images/testimonials/avatar-5.jpeg',
  },
];

const HomeTestimonial = () => (
  <div
    id="testimonials"
    className="min-h-screen-home relative container mx-auto flex flex-col items-center justify-center gap-14 px-4 py-14"
  >
    <span className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
      Testimonials
    </span>
    <ul className="flex max-w-md flex-wrap justify-center gap-4 sm:max-w-screen-md sm:gap-6 lg:max-w-screen-lg">
      {testimonials.map((testimonial, index) => (
        <li
          key={testimonial.id}
          className={cn(
            'w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]',
            index > 2 && 'hidden md:block'
          )}
        >
          <div className="bg-accent size-full rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="aspect-square size-12">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={testimonial.avatar || undefined}
                    alt={`Profile photo of ${testimonial.name}, ${testimonial.designation}`}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{testimonial.name}</p>
                  <p className="text-sm">{testimonial.designation}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link
                  href="#"
                  target="_blank"
                  aria-label={`View ${testimonial.name}'s profile on X (formerly Twitter)`}
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
              </Button>
            </div>
            <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default HomeTestimonial;
