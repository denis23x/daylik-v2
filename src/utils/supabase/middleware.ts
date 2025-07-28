import { type NextRequest, NextResponse } from 'next/server';
import { LOCALES } from '@/lib/constants';

export const updateSession = async (request: NextRequest, response: NextResponse) => {
  const path =
    request.nextUrl.pathname
      .split('/')
      .filter((segment) => !!segment)
      .filter((segment) => !LOCALES.includes(segment))
      .shift() || '/';

  const isIndex = path === '/';

  if (isIndex) {
    return response;
  }

  // The following section handles redirect logic
  // for authenticated and unauthenticated users.

  const { createServerClient } = await import('@supabase/ssr');
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If a user is not authenticated and tries to access a private route,
  // they should be redirected to the login page.

  const isPrivate = ['analytics', 'settings', 'sync', 'teammates', 'teams'].some((segment) => {
    return path.startsWith(segment);
  });

  if (!user && isPrivate) {
    const url = request.nextUrl.clone();

    url.pathname = `/login`;

    return NextResponse.redirect(url);
  }

  // If a user is already authenticated and tries to access an authentication route or the index route,
  // they should be redirected to the teams page.

  const isAuth = ['login', 'signup', 'verify-email', 'reset-password'].some((segment) => {
    return path.startsWith(segment);
  });

  if (user && isAuth) {
    const url = request.nextUrl.clone();

    url.pathname = `/teams`;

    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return response;
};
