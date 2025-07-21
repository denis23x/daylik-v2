import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { ComponentProps } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    designation: 'Engineering Lead',
    company: 'TechCorp',
    testimonial:
      'Daylik completely transformed how our team handles daily updates. No more chaos — just clarity.',
    avatar: '/images/testimonials/avatar-1.jpeg',
  },
  {
    id: 2,
    name: 'Sophia Lee',
    designation: 'Data Analyst',
    company: 'InsightTech',
    testimonial:
      'The analytics give me exactly what I need — clear trends and insights without the noise.',
    avatar: '/images/testimonials/avatar-2.jpeg',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    designation: 'UX Designer',
    company: 'DesignPro',
    testimonial:
      'The easiest onboarding experience we’ve had. Our daily check-ins are now automated and transparent.',
    avatar: '/images/testimonials/avatar-3.jpeg',
  },
  {
    id: 4,
    name: 'Emily Davis',
    designation: 'Marketing Specialist',
    company: 'BrandBoost',
    testimonial: 'We’ve seen a huge boost in accountability and focus thanks to Daylik.',
    avatar: '/images/testimonials/avatar-4.jpeg',
  },
  {
    id: 5,
    name: 'Daniel Martinez',
    designation: 'Full-Stack Developer',
    company: 'CodeCrafters',
    testimonial:
      'The best tool we’ve added to our workflow. Lightweight, powerful, and incredibly easy to use.',
    avatar: '/images/testimonials/avatar-5.jpeg',
  },
  {
    id: 6,
    name: 'Jane Smith',
    designation: 'Product Manager',
    company: 'InnovateX',
    testimonial:
      'Finally, a sync tool that doesn’t feel like a chore. Everyone’s actually using it — and loving it.',
    avatar: '/images/testimonials/avatar-6.jpeg',
  },
];

const HomeTestimonial = () => (
  <div className="flex min-h-screen items-center justify-center px-6 py-12">
    <div>
      <span className="mb-14 text-center text-5xl font-bold tracking-tight md:text-6xl">
        Testimonials
      </span>
      <div className="mx-auto max-w-screen-xl columns-1 gap-8 md:columns-2 lg:columns-3">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-accent mb-8 break-inside-avoid rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="aspect-square size-12">
                  <AvatarImage
                    className="bg-secondary object-cover"
                    src={testimonial.avatar || undefined}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl font-medium">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.designation}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="#" target="_blank">
                  <TwitterLogo className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const TwitterLogo = (props: ComponentProps<'svg'>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>X</title>
    <path
      fill="currentColor"
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
    />
  </svg>
);

export default HomeTestimonial;
