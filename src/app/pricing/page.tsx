import Subscribe from "@/components/buttons/subscribe";
import Stripe from "stripe";

export default async function Pricing() {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const { data: prices } = await stripe.prices.list();
  console.log(prices);

  let plans = await Promise.all(
    prices
      .filter((price) => price.active === true)
      .map(async (price) => {
        const product = await stripe.products.retrieve(price.product as string);
        console.log(product);
        return {
          id: price.id,
          name: product.name,
          price: price.unit_amount,
          interval: price.recurring?.interval,
          currency: price.currency,
        };
      })
  );

  plans.push({
    id: "basic",
    name: "Basic",
    price: 0.0,
    interval: "month",
    currency: "gbp",
  });

  const sortedPlans = plans.sort((a, b) => a.price! - b.price!);
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around">
      {sortedPlans.map((plan) => (
        <div key={plan?.id} className="w-80 h-40 rounded shadow px-6 py-8">
          <h2>{plan?.name}</h2>
          <p>
            £{plan?.price! / 100}/ {plan?.interval}
          </p>
          <Subscribe planId={plan?.id} />
        </div>
      ))}
    </div>
  );
}
