import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: Request) {
  const { data: user } = await supabase.auth.getUser();
  const supabase = createRouteHandlerClient({ cookies });
  const { data: user } = await supabase.auth.getUser();
  if (user) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15',
    });

    const body = await request.json();

    const params: Stripe.CustomerCreateParams = {
      email: body?.record.email,
    };

    const customer: Stripe.Customer = await stripe.customers.create(params);
  }
  const { data: user } = await supabase.auth.getUser();
  console.log(user, '<< user');
  const response = await supabase
    .from('profiles')
    .update({
      stripe_customer: customer.id,
    })
    .eq('id', body?.record.id);

  console.log(response);

  return NextResponse.json({
    message: `stripe customer created ${customer.id}`,
  });
}
