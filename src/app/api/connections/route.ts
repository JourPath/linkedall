import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// PUT - create connections
export async function POST(req: NextRequest) {
  const { connection_id, list_id } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('connections')
    .insert({
      connection_id: connection_id,
      profile_id: user?.user?.id,
      list_id: list_id,
    })
    .eq('profile_id', user?.user?.id);
  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}

// DELETE - remove connection
export async function PUT(req: NextRequest) {
  const { connection_id, list_id } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('connections')
    .delete()
    .eq('connection_id', connection_id)
    .eq('profile_id', user?.user?.id)
    .eq('list_id', list_id);

  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}
