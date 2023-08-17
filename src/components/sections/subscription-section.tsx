"use client";

import { createClient } from "@/lib/supabase/supabase-browser";
import { useAuth } from "@/utils/providers/supabase-auth-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback, useEffect, useState } from "react";
import { customer } from "@/utils/types/collections.types";

export default async function SubscriptionSection() {
  const [customer, setCustomer] = useState<customer>();
  const router = useRouter();
  const supabase = createClient();
  const { user } = useAuth();

  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  if (plan && plan !== "null") {
    const response = await fetch(
      `https://www.linkedall.online/api/stripe/subscription/${plan}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  }

  useEffect(() => {
    const customerData = async function () {
      console.log(user);
      const { data } = await supabase
        .from("customers")
        .select("*")
        .eq("id", user?.id)
        .single();
      if (data) {
        setCustomer(data);
      }
    };
    customerData();
  }, [user]);

  async function loadPortal(planToManage: string) {
    if (planToManage === "BASIC") {
    }

    const response = await fetch(
      "https://www.linkedall.online/api/stripe/portal",
      {
        method: "POST",
        //   body: JSON.stringify({ shortId }),
      }
    );
    const data = await response.json();
    router.push(data.url);
  }

  return (
    <div>
      <h2>Subscription</h2>
      <p>Plan: {customer?.plan}</p>
      {customer?.plan !== "BASIC" ? (
        <>
          <p>Interval: {customer?.interval}</p>
          <button onClick={() => loadPortal(customer?.plan!)}>
            Manage Subscription
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
