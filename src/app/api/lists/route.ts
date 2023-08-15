import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// GET - show lists where participant
export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('list_participants')
    .select('list_id, lists(list_name, short_id)')
    .eq('participant_id', user?.user?.id);
  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}

// PUT - create new list
export async function PUT(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { user, listName } = await request.json();
  const { error } = await supabase
    .from('lists')
    .insert({ list_name: listName, host_id: user?.id })
  const { data } = await supabase
  .from('lists')
  .select('short_id')
  .eq('list_name', listName)
  .eq('host_id', user?.id)  
  if (error) {
    return NextResponse.json({ error });
  } else if (data !== null) {
    return NextResponse.json({ data: data[0] });
  }
}

export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { list_id } = await request.json();
  const { error } = await supabase.from('lists').delete().eq('id', list_id);
  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ response: `List ${list_id} deleted` });
  }
}
