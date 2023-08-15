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

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign in process completes
  if (plan) {
    return NextResponse.redirect(`https://localhost:3000/profile?plan=${plan}`);
  } else {
    
    return NextResponse.redirect('https://localhost:3000/profile');
  }
}
