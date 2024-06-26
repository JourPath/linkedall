"use client";

import { createClient } from "@/lib/supabase/supabase-browser";
import { useAuth } from "@/utils/providers/supabase-auth-provider";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Subscribe({
  planId,
  planName,
}: {
  planId: string;
  planName: string;
}) {
  const { user } = useAuth();
  const [planText, setPlanText] = useState<string>(`Start ${planName} plan`);
  const [plan, setPlan] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const customerData = async function () {
      const planRes = await supabase
        .from("customers")
        .select("plan")
        .eq("id", user?.id!)
        .single();
      const plan = planRes.data?.plan;
      setPlan(plan!);
      if (plan === "BASIC") {
        setPlanText("Upgrade Subscription");
      } else {
        setPlanText("Manage Subscription");
      }
    };
    if (user) {
      customerData();
    }
  }, [user, supabase]);

  async function handleSubscribe(id: string) {
    if (!user) {
      router.push(`/signup?plan=${id}`);
    } else {
      if (plan !== "BASIC") {
        const response = await fetch(
          "https://www.linkedall.online/api/stripe/portal",
          {
            method: "POST",
            //   body: JSON.stringify({ shortId }),
          }
        );
        const data = await response.json();
        router.push(data.url);
      } else {
        const response = await fetch(
          `https://www.linkedall.online/api/stripe/subscription/${id}`,
          {
            method: "POST",
          }
        );
        const data = await response.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: data.id });
        return data;
      }
    }
  }

  return (
    <button
      className="bg-[--blue-2] rounded-md text-[--white] min-h-12 w-full font-bold text-lg my-8 py-4"
      onClick={() => handleSubscribe(planId)}
    >
      {planText}
    </button>
  );
}
