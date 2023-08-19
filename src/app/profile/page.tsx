import ProfileSection from '@/components/sections/profile-section';
import SubscriptionSection from '@/components/sections/subscription-section';

export default async function Profile() {
  return (
    <>
      <div className="bg-[--light-blue-1] h-screen">
        <ProfileSection />
        {/* <SubscriptionSection /> */}
      </div>
    </>
  );
}
