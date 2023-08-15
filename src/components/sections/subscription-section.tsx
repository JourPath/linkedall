"use client";

import { createClient } from "@/lib/supabase/supabase-browser";
import { useAuth } from "@/utils/providers/supabase-auth-provider";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

export default async function SubscriptionSection() {
  const router = useRouter();
  const supabase = createClient();

  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  if (plan && plan !== "null") {
    const response = await fetch(
      `https://linkedall.online/api/stripe/subscription/${plan}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
    await stripe?.redirectToCheckout({ sessionId: data.id });
  }

  const { user } = useAuth();
  const { data } = await supabase
    .from("customers")
    .select("*")
    .eq("id", user?.id)
    .single();

  async function loadPortal(planToManage: string) {
    if (planToManage === "basic") {
    }

    const response = await fetch("https://linkedall.online/api/stripe/portal", {
      method: "POST",
      //   body: JSON.stringify({ shortId }),
    });
    const data = await response.json();
    router.push(data.url);
  }

  return (
    <div>
      <h2>Subscription</h2>
      <p>Plan: {data?.plan}</p>
      {data?.plan !== "BASIC" ? (
        <>
          <p>Interval: {data?.interval}</p>
          <button onClick={() => loadPortal(data?.plan!)}>
            Manage Subscription
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
