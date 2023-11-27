import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const plan = requestUrl.searchParams.get("plan");
  const listId = requestUrl.searchParams.get("listid");
  const signUp = requestUrl.searchParams.get("signup");

  console.log(plan, ` :plan ${typeof plan}`);
  console.log(listId, ` :listid ${typeof listId}`);
  console.log(signUp, ` :signup ${typeof signUp}`);

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/login?error=${error.message}`
      );
    }
  }

  // Check if plan is not null and not an empty string
  if (plan && plan !== "null" && plan !== "") {
    console.log("plan");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/profile?plan=${plan}`
    );
  }
  // Check if listId is not null, not an empty string, and signUp is true
  else if (listId && listId !== "null" && listId !== "" && signUp === "true") {
    console.log("list id & sign up");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/profile?listid=${listId}`
    );
  }
  // Check if listId is not null and not an empty string
  else if (listId && listId !== "null" && listId !== "") {
    console.log("list id");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard?listid=${listId}`
    );
  }
  // Check if signUp is true
  else if (signUp === "true") {
    console.log("sign up");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}/profile`);
  }
  // Default case
  else {
    console.log("normal");
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
    );
  }
}
