import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {
  const { short_id } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data, error } = await supabase.rpc(
    'get_list_from_short_id',
    short_id
  );
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    console.log(data);
    return NextResponse.json({ data });
  }
}
