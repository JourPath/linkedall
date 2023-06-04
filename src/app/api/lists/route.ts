import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/supabase-server';

// GET - show lists where participant
export async function GET() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('list_participants')
    .select('list_id, lists(list_name)')
    .eq('participant_id', user?.user?.id);
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}

// GET - show lists where host

// POST - create new list
export async function POST(request: Request) {
  const supabase = createClient();
  const { user } = await request.json();
  const { data, error } = await supabase
    .from('lists')
    .insert({ list_name: 'My List', host_id: user?.id });
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}

// INSERT - join existing list

// DELETE - leave list

// DELETE - remove hosted list

export async function PATCH(request: Request) {
  const supabase = createClient();
  const thisThing = await request;
  console.log(thisThing);
  const { list_id } = await request.json();
  console.log(request.json(), '<<<');
  const { error } = await supabase.from('lists').delete().eq('id', list_id);
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ response: `List ${list_id} deleted` });
  }
}
