import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Geist } from "next/font/google";
import { cn } from "../lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://durofiles.com'),
  title: "DuroFiles - Free Professional Invoice Generator",
  description: "Create, customize, and download beautiful PDF invoices in seconds. No sign-up required. Choose from multiple professional templates.",
  keywords: "invoice generator, free invoice maker, pdf invoice, business invoice, billing software, gst invoice, receipt maker",
  authors: [{ name: "DuroFiles" }],
  creator: "DuroFiles",
  openGraph: {
    title: "DuroFiles - Free Professional Invoice Generator",
    description: "Create, customize, and download beautiful PDF invoices in seconds. No sign-up required.",
    url: 'https://durofiles.com',
    siteName: 'DuroFiles',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DuroFiles Invoice Generator',
      },
    ],
    locale: 'en_US',
    type: "website",
  },
  twitter: {
    card: 'summary_large_image',
    title: "DuroFiles - Free Professional Invoice Generator",
    description: "Create, customize, and download beautiful PDF invoices in seconds.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
