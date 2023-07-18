// import './globals.css';
import { Inter, Josefin_Sans } from 'next/font/google';
import SupabaseProvider from '@/utils/providers/supabase-provider';
import SupabaseAuthProvider from '@/utils/providers/supabase-auth-provider';
import { createClient } from '@/lib/supabase/supabase-server';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import GAnalytics from '@/lib/google/analytics';
import Script from 'next/script';
import NavBar from '@/components/nav/nav-bar';
import Footer from '@/components/sections/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});
const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin',
});

export const metadata = {
  title: 'LinkedAll',
  description: 'Making sure you connect with everyone',
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
      <body className={`flex flex-col h-screen`}>
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
