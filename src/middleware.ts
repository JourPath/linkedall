import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/utils/types/database.types';

export async function middleware(req: NextRequest) {
  try {
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

    // used to bmove user to new list from code
    if (
      session &&
      pathname === '/dashboard' &&
      req.nextUrl.searchParams.has('listid')
    ) {
      const url = new URL(req.url);
      const listid = req.nextUrl.searchParams.get('listid');
      url.pathname = `/lists/${listid}`;
      url.searchParams.append('new', 'true');
      return NextResponse.redirect(url);
    }

    // used to block login if logged in
    if (session && pathname === '/login') {
      const url = new URL(req.url);
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }

    // used to block confirm if logged in
    if (session && pathname === '/confirm') {
      const url = new URL(req.url);
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // used to block confirm if logged in
    if (!session && pathname === '/profile') {
      const url = new URL(req.url);
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    if (!session && pathname.includes('/lists')) {
      const listId = pathname.split('/').pop();
      const url = new URL(req.url);
      url.pathname = '/login';
      if (listId && listId !== 'lists') {
        url.searchParams.append('listid', listId);
      }
      return NextResponse.redirect(url);
    }

    return res;
  } catch (err) {
    console.error(err);
    // handle error or send a response indicating error
    return NextResponse.error();
  }
}

// might need matcher to specify route for dashboard
// export const config = {
//   matcher: ['/dashboard'],
// };
