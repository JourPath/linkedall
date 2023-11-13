'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { Customer } from '@/utils/types/collections.types';
import Link from 'next/link';

export default function SubscriptionSection({
  customer,
}: {
  customer: Customer;
}) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  useEffect(() => {
    async function handleStripeCheckout() {
      if ((plan && plan !== 'basic') || plan != 'null') {
        const response = await fetch(
          `https://www.linkedall.online/api/stripe/subscription/${plan}`,
          {
            method: 'POST',
          }
        );
        const data = await response.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: data.id });
      }
    }
    handleStripeCheckout();
  }, [plan]);

  async function loadPortal(planToManage: string) {
    const response = await fetch(
      'https://www.linkedall.online/api/stripe/portal',
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    router.push(data.url);
  }

  return (
    <section className="flex flex-col justify-center content-center md:w-1/2 items-center mx-8 mt-4 rounded-3xl bg-[--white] w-10/12 ">
      <h3 className="bg-[--light-blue-2] text-center font-bold text-2xl w-full px-2 py-4 rounded-t-3xl text-[--dark-blue-3]">
        Account
      </h3>
      <p className="my-4 ">Plan: {customer?.plan}</p>
      {customer?.plan !== 'BASIC' ? (
        <>
          <p>Interval: {customer?.interval?.toUpperCase()}</p>
          <button
            className="bg-[--blue-2] rounded-full text-[--white] h-12 w-1/2 my-4 px-2"
            onClick={() => loadPortal(customer?.plan!)}
          >
            Manage Subscription
          </button>
        </>
      ) : (
        <Link
          className="h-12 my-4 w-full justify-center flex mb-4"
          href={`/pricing`}
        >
          <button className="bg-[--blue-2] rounded-full text-[--white] h-12 w-1/2">
            Upgrade
          </button>
        </Link>
      )}
    </section>
  );
}
