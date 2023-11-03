// used to handle email sign up, see supabase docs
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from '@/utils/types/database.types';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const plan = requestUrl.searchParams.get('plan');
  const listId = requestUrl.searchParams.get('listid');
  const signUp = requestUrl.searchParams.get('signup');

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (plan) {
    return NextResponse.redirect(
      `https://www.linkedall.online/profile?plan=${plan}`
    );
  } else if (listId && signUp) {
    return NextResponse.redirect(
      `https://www.linkedall.online/profile?listid=${listId}`
    );
  } else if (listId) {
    return NextResponse.redirect(
      `https://www.linkedall.online/dashboard?listid=${listId}`
    );
  } else if (signUp) {
    return NextResponse.redirect('https://www.linkedall.online/profile');
  } else {
    return NextResponse.redirect('https://www.linkedall.online/dashboard');
  }
}
