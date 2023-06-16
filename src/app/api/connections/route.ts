import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/lib/supabase/supabase-server';

// GET - show connections
export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('connections')
    .select('connection_id')
    .eq('profile_id', user?.user?.id);
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}

// PUT - create connections
export async function POST(req: NextRequest) {
  const { connection_id } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('connections')
    .insert({ connection_id: connection_id, profile_id: user?.user?.id })
    .eq('profile_id', user?.user?.id);
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}

// DELETE - remove connection
export async function PUT(req: NextRequest) {
  const { connection_id } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const userData = `profile_id.eq.${user?.user?.id}`;
  const connectionData = `connection_id.eq.${connection_id}`;
  const qString = userData + ',and(' + connectionData + ')';
  const { data, error } = await supabase
    .from('connections')
    .delete()
    .eq('connection_id', connection_id)
    .eq('profile_id', user?.user?.id);

  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}
