import { createClient } from '@/lib/supabase/supabase-server';
import { NextResponse } from 'next/server';

// GET - show lists where participant
export async function GET(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('list_participants')
    .select('list_id, lists(list_name)')
    .eq('participant_id', user?.id);
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    console.log(data);
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
  console.log('here');
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
