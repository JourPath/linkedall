import ProfileSection from "@/app/profile/_components/profile-section";
import SubscriptionSection from "@/app/profile/_components/subscription-section";
import { createClient } from "@/lib/supabase/supabase-server";

export default async function Profile() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user || !session) {
    return <div>Error fetching user 1</div>;
  }

  const customer = await supabase
    .from("customers")
    .select("*")
    .eq("id", user?.id!)
    .single();

  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!customer.data) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="bg-[--light-blue-1] flex flex-col md:flex-row justify-center items-center md:items-start w-full mb-4">
        <ProfileSection profile={profile.data} />
        <SubscriptionSection customer={customer.data} />
      </div>
    </>
  );
}
