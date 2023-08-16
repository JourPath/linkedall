import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function PUT(req: NextRequest) {
  const { shortId } = await req.json();
  console.log(shortId, "shortId")
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const response = await supabase.rpc('get_list_from_short_id', {
    shortid: shortId,
  });
  console.log(response, "response")

  // tidy up logic
  if (response.error) {
    return NextResponse.json({ error: response.error });
  } else if (!response.error) {
    const { data, error } = await supabase
      .from('list_participants')
      .insert({ list_id: response.data.id, participant_id: user?.user?.id });
      console.log(error,  "error")
    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ data });
    }
  }
}
