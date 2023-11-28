"use client";

import { createClient } from "@/lib/supabase/supabase-browser";
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
  const [userId, setUserId] = useState("");
  const [plan, setPlan] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSessionAndPlan = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUserId(session.user.id);
        const planRes = await supabase
          .from("customers")
          .select("plan")
          .eq("id", session.user.id)
          .single();
        if (planRes.data?.plan) {
          setPlan(planRes.data?.plan);
        }
      }
    };

    fetchSessionAndPlan();
  }, []);

  async function handleSubscribe(id: string) {
    if (!userId) router.push(`/signup?plan=${planId}`);
    if (plan !== "BASIC") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/portal`,
        {
          method: "POST",
          //   body: JSON.stringify({ shortId }),
        }
      );
      const data = await response.json();
      router.push(data.url);
    } else {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/subscription/${id}`,
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

  return (
    <button
      className="bg-[--blue-2] rounded-md text-[--white] min-h-12 w-full font-bold text-lg my-8 py-4"
      onClick={() => handleSubscribe(planId)}
    >
      {!userId
        ? `Start ${planName} plan`
        : plan === "BASIC"
          ? "Upgrade Subscription"
          : "Manage Subscription"}
    </button>
  );
}
