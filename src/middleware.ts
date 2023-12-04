import { createClient } from "@/lib/supabase/supabase-middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // tps://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return response;
}

// supabase.auth.onAuthStateChange((event, session) => {
//   if (event === "SIGNED_OUT" || event === "USER_UPDATED") {
//     // delete cookies on sign out
//     const expires = new Date(0).toUTCString();
//     document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
//     document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
//   } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
//     const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
//     document.cookie = `my-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
//     document.cookie = `my-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
//   }
// });

//   // used to block dashboard for those not logged in
//   if (!session && pathname === "/dashboard") {
//     const url = new URL(req.url);
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // used to bmove user to new list from code
//   if (
//     session &&
//     pathname === "/dashboard" &&
//     req.nextUrl.searchParams.has("listid")
//   ) {
//     const listid = req.nextUrl.searchParams.get("listid");

//     // Check if listid is not null and not an empty string
//     if (listid !== "null") {
//       const url = new URL(req.url);
//       url.pathname = `/lists/${listid}`;
//       url.searchParams.append("new", "true");
//       return NextResponse.redirect(url);
//     }
//   }
//   // used to block login if logged in
//   if (session && pathname === "/login") {
//     const url = new URL(req.url);
//     url.pathname = "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   // used to block confirm if logged in
//   if (session && pathname === "/confirm") {
//     const url = new URL(req.url);
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // used to block confirm if logged in
//   if (!session && pathname === "/profile") {
//     const url = new URL(req.url);
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   if (!session && pathname.includes("/lists")) {
//     const listId = pathname.split("/").pop();
//     const url = new URL(req.url);
//     url.pathname = "/signup";
//     if (listId && listId !== "lists") {
//       url.searchParams.append("listid", listId);
//     }
//     return NextResponse.redirect(url);
//   }

//   return res;
// } catch (err) {
//   console.error(err);
//   // handle error or send a response indicating error
//   return NextResponse.error();
// }
// }

// might need matcher to specify route for dashboard
// export const config = {
//   matcher: ['/dashboard'],
// };
