import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url!);
  const priceId = url.pathname.split("/").pop();

  const { data, error } = await supabase
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json(
      { message: "Error getting customer" },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { message: "Customer not found or stripe_customer_id is missing" },
      { status: 404 }
    );
  }

  const stripe_customer_id = data.stripe_customer_id;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const lineItems = [
    {
      price: priceId,
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    customer: stripe_customer_id,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `https://www.linkedall.online/payment/success`,
    cancel_url: `https://www.linkedall.online/payment/cancelled`,
  });

  return NextResponse.json({ id: session.id });
}
