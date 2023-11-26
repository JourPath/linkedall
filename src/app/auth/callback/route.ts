// used to handle email sign up, see supabase docs
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/utils/types/database.types";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const plan = requestUrl.searchParams.get("plan");
  const listId = requestUrl.searchParams.get("listid");
  const signUp = requestUrl.searchParams.get("signup");

  console.log(plan, ` :plan ${typeof plan}`);
  console.log(listId, ` :listid ${typeof listId}`);
  console.log(signUp, ` :signup ${typeof signUp}`);

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Check if plan is not null and not an empty string
  if (plan && plan !== "null" && plan !== "") {
    console.log("plan");
    return NextResponse.redirect(
      `https://www.linkedall.online/profile?plan=${plan}`
    );
  }
  // Check if listId is not null, not an empty string, and signUp is true
  else if (listId && listId !== "null" && listId !== "" && signUp === "true") {
    console.log("list id & sign up");
    return NextResponse.redirect(
      `https://www.linkedall.online/profile?listid=${listId}`
    );
  }
  // Check if listId is not null and not an empty string
  else if (listId && listId !== "null" && listId !== "") {
    console.log("list id");
    return NextResponse.redirect(
      `https://www.linkedall.online/dashboard?listid=${listId}`
    );
  }
  // Check if signUp is true
  else if (signUp === "true") {
    console.log("sign up");
    return NextResponse.redirect("https://www.linkedall.online/profile");
  }
  // Default case
  else {
    console.log("normal");
    return NextResponse.redirect("https://www.linkedall.online/dashboard");
  }
}
