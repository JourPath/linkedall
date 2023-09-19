// import './globals.css';
import { Inter, Josefin_Sans } from 'next/font/google';
import SupabaseProvider from '@/utils/providers/supabase-provider';
import SupabaseAuthProvider from '@/utils/providers/supabase-auth-provider';
import { createClient } from '@/lib/supabase/supabase-server';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import GAnalytics from '@/lib/google/analytics';
import NavBar from '@/components/nav/nav-bar';
import Footer from '@/components/sections/footer';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
});

export const metadata = {
  title: {
    template: '%s | LinkedAll',
    default: 'LinkedAll - Helping Professionals Connect',
  },
  description: 'Helping Professionals Connect',
  openGraph: {
    title: 'LinkedAll',
    description: 'Helping Professionals Connect',
    url: 'https://www.linkedall.online',
    siteName: 'LinkedAll',
    images: [
      {
        url: '/og-card.png',
        width: 1200,
        height: 630,
        alt: 'LinkedAll Logo of link icon with tagline "Helping Professionals Connect"',
      },
    ],
    type: 'website',
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
