import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function PATCH(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { list_id } = await request.json();
  const { data: user } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("list_participants")
    .delete()
    .eq("list_id", list_id)
    .eq("participant_id", user.user?.id);
  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ response: `List ${list_id} deleted` });
  }
}
