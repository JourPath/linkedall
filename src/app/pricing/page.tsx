import PricesDisplay from '@/components/sections/prices-display';
import Stripe from 'stripe';

export default async function Pricing() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
  });

  const { data: prices } = await stripe.prices.list();

  let plans = await Promise.all(
    prices
      .filter((price) => price.active === true)
      .map(async (price) => {
        const product = await stripe.products.retrieve(price.product as string);
        return {
          id: price.id,
          name: product.name,
          price: price.unit_amount,
          interval: price.recurring?.interval,
          currency: price.currency,
          metadata: product.metadata as Object as {
            max_host: number;
            max_people: number;
            max_join: number | string;
          },
          description: product.description,
        };
      })
  );

  plans.push(
    {
      id: 'basic',
      name: 'Basic',
      price: 0.0,
      interval: 'month',
      currency: 'gbp',
      metadata: { max_host: 1, max_people: 50, max_join: 3 },
      description: 'Get started for free with our basic plan.',
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 0.0,
      interval: 'year',
      currency: 'gbp',
      metadata: { max_host: 1, max_people: 50, max_join: 3 },
      description: 'Get started for free with our basic plan.',
    }
  );

  const sortedPlans = plans.sort((a, b) => a.price! - b.price!);
  return <PricesDisplay plans={sortedPlans} />;
}
