import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

type StripeSubscriptionObject = {
  customer: string;
  items: {
    data: Array<{
      price: {
        recurring: {
          interval: string;
        };
      };
    }>;
  };
  plan: { product: string };
};

export async function POST(request: NextRequest) {
  let event: Stripe.Event;
  const reqString = await request.text();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });
  const signature = request.headers.get("stripe-signature") as
    | string
    | string[];

  try {
    event = stripe.webhooks.constructEvent(
      reqString,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ message: `Webhook error` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.updated":
        const subscriptionObjectUpdated = event.data
          .object as StripeSubscriptionObject;
        const product = await stripe.products.retrieve(
          subscriptionObjectUpdated.plan.product
        );
        await supabase
          .from("customers")
          .update({
            plan: product.name.toUpperCase(),
            interval:
              subscriptionObjectUpdated.items.data[0].price.recurring.interval,
          })
          .eq("stripe_customer_id", subscriptionObjectUpdated.customer);
        break;
      case "customer.subscription.deleted":
        const subscriptionObjectDeleted = event.data
          .object as StripeSubscriptionObject;
        await supabase
          .from("customers")
          .update({ plan: "BASIC", interval: null })
          .eq("stripe_customer_id", subscriptionObjectDeleted.customer);
        break;
      case "charge.succeeded":
        const charge = event.data.object as Stripe.Charge;
        await stripe.customers.update(charge.customer as string, {
          name: charge.billing_details.name!,
        });
        break;
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json(err.message);
    } else {
      return NextResponse.json(
        { message: `Error updating customer` },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ message: "event received" }, { status: 200 });
}
