import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function PUT(req: NextRequest) {
  const { shortId } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const { data: id, error } = await supabase.rpc('get_list_from_short_id', {
    shortid: shortId,
  });

  // tidy up logic
  if (error) {
    return NextResponse.json({ error });
  } else if (!error) {
    const { data, error } = await supabase
      .from('list_participants')
      .insert({ list_id: id.id, participant_id: user?.user?.id });
      console.log(error)
    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ data });
    }
  }
}
