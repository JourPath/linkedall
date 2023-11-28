import { createClient } from "@/lib/supabase/supabase-route";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// GET - show lists where participant
export async function GET() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const { data: user } = await supabase.auth.getUser();
  if (user && user.user && user.user.id) {
    const { data, error } = await supabase
      .from("list_participants")
      .select("list_id, lists(list_name, short_id)")
      .eq("participant_id", user.user.id);
    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ data });
    }
  }
}

// PUT - create new list
export async function PUT(request: Request) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const { user, listName } = await request.json();
  if (user && user.id && listName) {
    const { error } = await supabase
      .from("lists")
      .insert({ list_name: listName, host_id: user.id });
    const { data } = await supabase
      .from("lists")
      .select("short_id")
      .eq("list_name", listName)
      .eq("host_id", user.id);
    if (error) {
      return NextResponse.json({ error });
    } else if (data !== null) {
      const short_id = data[0].short_id;
      return NextResponse.json({ short_id });
    }
  }
}

export async function PATCH(request: Request) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);
  const { list_id } = await request.json();
  const { error } = await supabase.from("lists").delete().eq("id", list_id);
  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ response: `List ${list_id} deleted` });
  }
}
