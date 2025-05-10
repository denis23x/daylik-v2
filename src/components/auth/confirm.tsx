'use client';

import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/utils/supabase/client';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

const AuthConfirmation = () => {
  const router = useRouter();

  const checkSession = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      toast.error(error.message);
    }

    if (data.session) {
      router.push('/teams');
    }
  }, [router, supabase.auth]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          '[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          'inset-x-0 h-full skew-y-12'
        )}
      />
      <div className="relative z-10 max-w-2xl text-center">
        <Badge className="bg-primary rounded-full border-none py-1">Just released v1.0.0</Badge>
        <h1 className="mt-6 text-4xl !leading-[1.2] font-bold tracking-tight sm:text-5xl md:text-6xl">
          Email confirmation
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          We&apos;ve sent a confirmation email to your inbox. Please check your email and click the
          confirmation link to complete your registration.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="rounded-full text-base">
              Return to Login <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthConfirmation;
