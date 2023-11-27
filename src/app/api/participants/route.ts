import { createClient } from "@/lib/supabase/supabase-route";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { list_id } = await request.json();
  const { data: user } = await supabase.auth.getUser();
  if (user && user.user && user.user.id && list_id) {
    const { error } = await supabase
      .from("list_participants")
      .delete()
      .eq("list_id", list_id)
      .eq("participant_id", user.user.id);
    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ response: `List ${list_id} deleted` });
    }
  }
}
