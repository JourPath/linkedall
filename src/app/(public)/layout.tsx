import NavBar from "@/components/nav/nav-bar";
import Footer from "@/components/sections/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
