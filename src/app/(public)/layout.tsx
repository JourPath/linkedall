import NavBar from "@/components/nav/nav-bar";
import Footer from "@/components/sections/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen justify-between`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
