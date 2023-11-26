import ProfileSection from "@/components/sections/profile-section";
import SubscriptionSection from "@/components/sections/subscription-section";
import { createClient } from "@/lib/supabase/supabase-server";

export default async function Profile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const customer = await supabase
    .from("customers")
    .select("*")
    .eq("id", user?.id!)
    .single();

  if (!customer.data) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="bg-[--light-blue-1] flex flex-col md:flex-row justify-center items-center md:items-start w-full mb-4">
        <ProfileSection />
        <SubscriptionSection customer={customer.data} />
      </div>
    </>
  );
}
