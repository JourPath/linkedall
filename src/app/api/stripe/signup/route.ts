import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  console.log(request)
  const body = await request.json()
  // console.log(body)
  const url = new URL(request.url!)
  // console.log(url)
  const apiRouteSecret = url.searchParams.get("API_ROUTE_SECRET");
  if (apiRouteSecret !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  );

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2022-11-15',
    });

    const params: Stripe.CustomerCreateParams = {
      email: body?.record.email,
    };

    const customer: Stripe.Customer = await stripe.customers.create(params);
    console.log(customer)
    const supabaseResponse = await supabase
      .from('customers')
      .update({
        stripe_customer_id: customer.id,
      })
      .eq('id', body?.record.id);

    console.log(supabaseResponse);

    return NextResponse.json({
      message: `stripe customer created ${customer.id}`,
    });
  }
  catch (e) {
    console.log(e)
    return NextResponse.error();
  }
}
