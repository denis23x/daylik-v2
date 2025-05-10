import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="border-accent flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden border-b">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-x-10 gap-y-14 px-6 py-12 lg:flex-row lg:py-0">
        <div className="max-w-xl">
          <Badge className="rounded-full border-none py-1">Just released v1.0.0</Badge>
          <h1 className="xs:text-4xl mt-6 max-w-[20ch] text-3xl !leading-[1.2] font-bold tracking-tight sm:text-5xl lg:text-[2.75rem] xl:text-5xl">
            Customized Shadcn UI Blocks & Components
          </h1>
          <p className="xs:text-lg mt-6 max-w-[60ch]">
            Explore a collection of Shadcn UI blocks and components, ready to preview and copy.
            Streamline your development workflow with easy-to-implement examples.
          </p>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full rounded-full text-base sm:w-auto">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full rounded-full text-base shadow-none sm:w-auto"
            >
              <CirclePlay className="!h-5 !w-5" /> Watch Demo
            </Button>
          </div>
        </div>
        <div className="bg-accent relative aspect-square w-full rounded-xl lg:max-w-lg xl:max-w-xl">
          <Image src="images/placeholder.svg" fill alt="" className="rounded-xl object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
