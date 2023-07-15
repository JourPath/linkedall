// import './globals.css';
import { Inter, Josefin_Sans } from 'next/font/google';
import SupabaseProvider from '@/utils/providers/supabase-provider';
import SupabaseAuthProvider from '@/utils/providers/supabase-auth-provider';
import { createClient } from '@/lib/supabase/supabase-server';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Head from 'next/head';

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
      <Head>
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="282d6d86-0b13-48b9-8d4c-48b99e1c5e21"
          data-blockingmode="auto"
          type="text/javascript"
        ></script>
      </Head>
      <body className={inter.className}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            {children}
            <Analytics />
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
