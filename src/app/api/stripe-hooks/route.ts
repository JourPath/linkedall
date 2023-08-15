import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
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
};

export async function POST(request: NextRequest) {
  let event : Stripe.Event
  const reqString = await request.text()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );


    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: '2022-11-15',
      });
    const signature = request.headers.get("stripe-signature") as string | string[]

    try{

    event = stripe.webhooks.constructEvent(reqString, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
        return NextResponse.json({ message: `Webhook error` }, { status: 400 })
    }

    switch (event.type){
      case "customer.subscription.updated":
        const subscriptionObjectUpdated = event.data.object as StripeSubscriptionObject;
        await supabase
        .from('customers')
        .update({is_subscribed: true, interval: subscriptionObjectUpdated.items.data[0].price.recurring.interval})
        .eq('stripe_customer_id', subscriptionObjectUpdated.customer)
        break;
        case "customer.subscription.deleted":
        const subscriptionObjectDeleted = event.data.object as StripeSubscriptionObject;
        await supabase
        .from('customers')
        .update({is_subscribed: false, interval: null})
        .eq('stripe_customer_id', subscriptionObjectDeleted.customer)
        break;

    }

   return NextResponse.json({ message: 'event received' }, { status: 200 })


}