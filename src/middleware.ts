import type { Database } from "@/utils/types/database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    let res = NextResponse.next({
      request: {
        headers: req.headers,
      },
    });
    const pathname = req.nextUrl.pathname;
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            req.cookies.set({
              name,
              value,
              ...options,
            });
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            res.cookies.set({
              name,
              value,
              ...options,
            });
          },
          remove(name: string, options: CookieOptions) {
            req.cookies.set({
              name,
              value: "",
              ...options,
            });
            res = NextResponse.next({
              request: {
                headers: req.headers,
              },
            });
            res.cookies.set({
              name,
              value: "",
              ...options,
            });
          },
        },
      }
    );

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // used to block dashboard for those not logged in
    if (!session && pathname === "/dashboard") {
      const url = new URL(req.url);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // used to bmove user to new list from code
    if (
      session &&
      pathname === "/dashboard" &&
      req.nextUrl.searchParams.has("listid")
    ) {
      const listid = req.nextUrl.searchParams.get("listid");

      // Check if listid is not null and not an empty string
      if (listid !== "null") {
        const url = new URL(req.url);
        url.pathname = `/lists/${listid}`;
        url.searchParams.append("new", "true");
        return NextResponse.redirect(url);
      }
    }
    // used to block login if logged in
    if (session && pathname === "/login") {
      const url = new URL(req.url);
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    // used to block confirm if logged in
    if (session && pathname === "/confirm") {
      const url = new URL(req.url);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // used to block confirm if logged in
    if (!session && pathname === "/profile") {
      const url = new URL(req.url);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if (!session && pathname.includes("/lists")) {
      const listId = pathname.split("/").pop();
      const url = new URL(req.url);
      url.pathname = "/signup";
      if (listId && listId !== "lists") {
        url.searchParams.append("listid", listId);
      }
      return NextResponse.redirect(url);
    }

    return res;
  } catch (err) {
    console.error(err);
    // handle error or send a response indicating error
    return NextResponse.error();
  }
}

// might need matcher to specify route for dashboard
// export const config = {
//   matcher: ['/dashboard'],
// };
