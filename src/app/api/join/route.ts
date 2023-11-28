import { createClient } from "@/lib/supabase/supabase-route";
import { get_list_from_short_id } from "@/utils/types/collections.types";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const cookieStore = cookies();
  const { shortId } = await req.json();
  const supabase = await createClient(cookieStore);
  const { data: user } = await supabase.auth.getUser();
  const result = await supabase.rpc("get_list_from_short_id", {
    shortid: shortId,
  });

  if (result.error) {
    console.log(result.error);
    return;
  }
  const list = result.data as get_list_from_short_id["Returns"];
  const { id } = list[0];
  if (user && user.user && user.user.id && id) {
    const { data, error } = await supabase
      .from("list_participants")
      .insert({ list_id: id, participant_id: user.user.id });
    if (error) {
      return NextResponse.json({ error });
    } else {
      return NextResponse.json({ data });
    }
  }
}
