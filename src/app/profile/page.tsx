import NavBar from '@/components/nav/navBar';
import Footer from '@/components/sections/footer';
import ProfileSection from '@/components/sections/profileSection';

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
