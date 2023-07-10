import NavBar from '@/components/nav/nav-bar';
import Footer from '@/components/sections/footer';
import ProfileSection from '@/components/sections/profile-section';

export default async function Profile() {
  return (
    <>
      <NavBar />
      <div className="bg-[--light-blue-1] h-screen">
        <ProfileSection />
      </div>
      <Footer />
    </>
  );
}
