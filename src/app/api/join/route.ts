import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { get_list_from_short_id } from "@/utils/types/collections.types";

export async function PUT(req: NextRequest) {
  const { shortId } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
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
  const { data, error } = await supabase
    .from("list_participants")
    .insert({ list_id: id, participant_id: user?.user?.id });
  if (error) {
    return NextResponse.json({ error });
  } else {
    return NextResponse.json({ data });
  }
}
