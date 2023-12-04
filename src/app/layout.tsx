// import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import GAnalytics from "@/lib/google/analytics";
import { ThemeProvider } from "@/lib/shadcn/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
  return (
    <html lang="en">
      <body className={`flex flex-col h-screen justify-between`}>
        <GAnalytics />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
