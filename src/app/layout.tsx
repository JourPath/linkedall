// import './globals.css';
import { Inter, Josefin_Sans } from 'next/font/google';
import SupabaseProvider from '@/utils/providers/supabase-provider';
import SupabaseAuthProvider from '@/utils/providers/supabase-auth-provider';
import { createClient } from '@/lib/supabase/supabase-server';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import GAnalytics from '@/lib/google/analytics';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
const josefin = Josefin_Sans({ subsets: ['latin'] });

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
    <html lang="en" className="text-[--dark-blue-3] bg-[--light-blue-1]">
      <body className={inter.className}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            {children}
            <GAnalytics />
            <Analytics />
            <Script
              id="CookieDeclaration"
              src="https://consent.cookiebot.com/282d6d86-0b13-48b9-8d4c-48b99e1c5e21/cd.js"
              type="text/javascript"
              async
            ></Script>
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
