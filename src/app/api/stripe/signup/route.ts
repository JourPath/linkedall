import { createClientServer } from "@/lib/supabase/supabase-server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const url = new URL(request.url!);
  const apiRouteSecret = url.searchParams.get("API_ROUTE_SECRET");
  if (apiRouteSecret !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const cookieStore = cookies();
  const supabase = await createClientServer(cookieStore);

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2022-11-15",
    });

    const params: Stripe.CustomerCreateParams = {
      email: body?.record.email,
    };

    const customer: Stripe.Customer = await stripe.customers.create(params);
    await supabase
      .from("customers")
      .update({
        stripe_customer_id: customer.id,
      })
      .eq("id", body?.record.id);

    return NextResponse.json({
      message: `stripe customer created ${customer.id}`,
    });
  } catch (e) {
    return NextResponse.error();
  }
}
