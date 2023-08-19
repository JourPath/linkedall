'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { Customer } from '@/utils/types/collections.types';
import { useSupabase } from '@/utils/providers/supabase-provider';

export default async function SubscriptionSection() {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerLoading, setCustomerLoading] = useState(true);
  const router = useRouter();
  const { supabase } = useSupabase();
  const { user, isLoading } = useAuth();

  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  useEffect(() => {
    const fetchCustomerData = async () => {
      const { data } = await supabase
        .from('customers')
        .select('*')
        .eq('id', user?.id)
        .single();
      if (data) {
        setCustomer(data);
      }
      setCustomerLoading(false);
    };
    if (!isLoading && user) {
      fetchCustomerData();
    }
  }, [user]);

  if (plan && plan !== 'basic') {
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

  if (isLoading || customerLoading) {
    return <p>Loading Subscription...</p>;
  }

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
    <div>
      <h2>Subscription</h2>
      <p>Plan: {customer?.plan}</p>
      {customer?.plan !== 'BASIC' ? (
        <>
          <p>Interval: {customer?.interval}</p>
          <button onClick={() => loadPortal(customer?.plan!)}>
            Manage Subscription
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
