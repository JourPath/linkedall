import { NextResponse, NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@/lib/supabase/supabase-server';

// // GET - show lists where participant
// export async function GET(req: NextRequest) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { data: user } = await supabase.auth.getUser();
//   const { data, error } = await supabase
//     .from('list_participants')
//     .select('list_id, lists(list_name, short_id)')
//     .eq('participant_id', user?.user?.id);
//   if (error) {
//     console.log(error);
//     return NextResponse.json({ error });
//   } else {
//     return NextResponse.json({ data });
//   }
// }

// // POST - create new list
// export async function PUT(request: Request) {
//   const supabase = createRouteHandlerClient({ cookies });
//   const { user, listName } = await request.json();
//   const { data, error } = await supabase
//     .from('lists')
//     .insert({ list_name: listName, host_id: user?.id });
//   if (error) {
//     console.log(error);
//     return NextResponse.json({ error });
//   } else {
//     return NextResponse.json({ data });
//   }
// }

// // INSERT - join existing list

// // DELETE - leave list

// // DELETE - remove hosted list

export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { list_id } = await request.json();
  const { data: user } = await supabase.auth.getUser();
  const { error } = await supabase
    .from('list_participants')
    .delete()
    .eq('list_id', list_id)
    .eq('participant_id', user.user?.id);
  if (error) {
    console.log(error);
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ response: `List ${list_id} deleted` });
  }
}
