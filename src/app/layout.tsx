// import './globals.css';
import { Inter } from 'next/font/google';
import SupabaseProvider from '@/components/providers/supabase-provider';
import SupabaseAuthProvider from '@/components/providers/supabase-auth-provider';
import { createClient } from '@/lib/supabase/supabase-server';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            {children}
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
