import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// GET - show connections
export async function PUT(req: NextRequest) {
  const { list_id } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .eq('profile_id', user?.user?.id)
    .eq('list_id', list_id);
  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}
