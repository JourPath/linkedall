import { createClient } from "@/lib/supabase/supabase-route";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET - show connections
export async function PUT(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { list_id } = await req.json();
  const { data: user } = await supabase.auth.getUser();
  if (user && user.user && user.user.id && list_id) {
    const { data, error } = await supabase
      .from("connections")
      .select("*")
      .eq("profile_id", user.user.id)
      .eq("list_id", list_id);
    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ data });
    }
  }
}
