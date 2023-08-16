"use client";

import { useAuth } from "@/utils/providers/supabase-auth-provider";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

export default function Subscribe({ planId }: { planId: string }) {
  const { user } = useAuth();
  const router = useRouter();

  async function handleSubscribe(id: string) {
    if (!user) {
      router.push(`/signup?plan=${id}`);
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

  return <button onClick={() => handleSubscribe(planId)}>Subscribe</button>;
}
