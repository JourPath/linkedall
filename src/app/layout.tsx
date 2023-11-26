// import './globals.css';
import NavBar from "@/components/nav/nav-bar";
import Footer from "@/components/sections/footer";
import GAnalytics from "@/lib/google/analytics";
import { createClient } from "@/lib/supabase/supabase-server";
import SupabaseAuthProvider from "@/utils/providers/supabase-auth-provider";
import SupabaseProvider from "@/utils/providers/supabase-provider";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Josefin_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
});

export const metadata = {
  title: {
    template: "%s | LinkedAll",
    default: "LinkedAll - Helping Professionals Connect",
  },
  description: "Helping Professionals Connect",
  openGraph: {
    title: "LinkedAll",
    description: "Helping Professionals Connect",
    url: `${process.env.NEXT_PUBLIC_API_URL}`,
    siteName: "LinkedAll",
    images: [
      {
        url: "/og-card-linked.png",
        width: 1200,
        height: 630,
        alt: 'LinkedAll Logo of link icon with tagline "Helping Professionals Connect"',
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedAll",
    description: "Helping Professionals Connect",
    creator: "@linkedallonline",
    images: {
      url: "./og-card-linked.png",
      alt: 'LinkedAll Logo of link icon with tagline "Helping Professionals Connect"',
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${josefin.variable}  text-[--dark-blue-3] bg-[--light-blue-1]`}
    >
      <body className={`flex flex-col h-screen justify-between`}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            <GAnalytics />
            <Analytics />
            <NavBar />
            {children}
            <Footer />
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
