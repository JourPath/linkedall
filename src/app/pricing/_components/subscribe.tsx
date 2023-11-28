import { readUserSession } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/supabase-server";
import { loadStripe } from "@stripe/stripe-js";
import { redirect } from "next/navigation";

export default async function Subscribe({
  planId,
  planName,
}: {
  planId: string;
  planName: string;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await readUserSession();

  const getPlan = async () => {
    if (session?.user) {
      const planRes = await supabase
        .from("customers")
        .select("plan")
        .eq("id", session.user.id)
        .single();
      const plan = planRes.data?.plan;
      return plan;
    } else return null;
  };

  const plan = await getPlan();

  async function handleSubscribe(id: string) {
    if (!session?.user) redirect(`/signup?plan=${planId}`);
    if (plan !== "BASIC") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/stripe/portal`,
        {
          method: "POST",
          //   body: JSON.stringify({ shortId }),
        }
      );
      const data = await response.json();
      redirect(data.url);
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
      {!session
        ? `Start ${planName} plan`
        : plan === "BASIC"
          ? "Upgrade Subscription"
          : "Manage Subscription"}
    </button>
  );
}
