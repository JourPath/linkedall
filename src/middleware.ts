import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/lib/types/database.types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // used to block dashboard for those not logged in
  if (!session && pathname === '/dashboard') {
    const url = new URL(req.url);
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return res;
}

// might need matcher to specify route for dashboard
// export const config = {
//   matcher: ['/dashboard'],
// };
