import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // const plan = searchParams.get("plan");
  // const listId = searchParams.get("listid");
  // const signUp = searchParams.get("signup");

  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

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
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // // Check if plan is not null and not an empty string
  // if (plan && plan !== "null" && plan !== "") {
  //   return NextResponse.redirect(`${requestUrl.origin}/profile?plan=${plan}`);
  // }
  // // Check if listId is not null, not an empty string, and signUp is true
  // else if (listId && listId !== "null" && listId !== "" && signUp === "true") {
  //   return NextResponse.redirect(
  //     `${requestUrl.origin}/profile?listid=${listId}`
  //   );
  // }
  // // Check if listId is not null and not an empty string
  // else if (listId && listId !== "null" && listId !== "") {
  //   return NextResponse.redirect(
  //     `${requestUrl.origin}/dashboard?listid=${listId}`
  //   );
  // }
  // // Check if signUp is true
  // else if (signUp === "true") {
  //   return NextResponse.redirect(`${requestUrl.origin}/profile`);
  // } else if (next) {
  //   return NextResponse.redirect(`${requestUrl.origin}${next}`);
  // }
  // // Default case
  // else {
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  // }
}
