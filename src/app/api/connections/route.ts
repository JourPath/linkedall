import { createClientRoute } from "@/lib/supabase/supabase-route";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// PUT - create connections
export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = await createClientRoute(cookieStore);
  const { connection_id, list_id } = await req.json();
  const { data: user } = await supabase.auth.getUser();
  if (user && user.user && user.user.id && connection_id && list_id) {
    const { data, error } = await supabase
      .from("connections")
      .insert({
        connection_id: connection_id,
        profile_id: user?.user?.id,
        list_id: list_id,
      })
      .eq("profile_id", user.user.id);
    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ data });
    }
  }
}

// DELETE - remove connection
export async function PUT(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = await createClientRoute(cookieStore);
  const { connection_id, list_id } = await req.json();
  const { data: user } = await supabase.auth.getUser();
  if (user && user.user && user.user.id && connection_id && list_id) {
    const { data, error } = await supabase
      .from("connections")
      .delete()
      .eq("connection_id", connection_id)
      .eq("profile_id", user.user.id)
      .eq("list_id", list_id);

    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ data });
    }
  }
}
