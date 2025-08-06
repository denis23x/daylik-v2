import { type NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  return await updateSession(request, handleI18nRouting(request));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|sw.js|.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp|webmanifest|json|xml|txt|ico)$).*)',
  ],
};
