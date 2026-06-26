import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Geist } from "next/font/google";
import { cn } from "../lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

// ── Viewport (theme colour, mobile) ──────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#863bff',
  width: 'device-width',
  initialScale: 1,
};

// ── Site-wide SEO defaults (overridden per page via generateMetadata) ─────────
export const metadata: Metadata = {
  metadataBase: new URL('https://durofiles.durozen.in'),

  // Title template: page-specific | DuroFiles
  title: {
    default: 'DuroFiles — Free Professional Invoice Generator',
    template: '%s | DuroFiles',
  },
  description:
    'Create, customise, and download beautiful PDF invoices in seconds. No sign-up required. GST-ready templates for freelancers and businesses.',
  keywords: [
    'Free Invoice Generator', 'Invoice Generator', 'Invoice Maker', 'PDF Invoice Generator', 'GST Invoice Generator',
    'free invoice maker', 'pdf invoice', 'business invoice',
    'billing software', 'gst invoice', 'receipt maker', 'durofiles',
  ],
  authors: [{ name: 'Durozen Technologies', url: 'https://durozen.in' }],
  creator: 'Durozen Technologies',
  publisher: 'Durozen Technologies',

  // ── Favicon / Icons ─────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/logo.png',
  },
  manifest: '/site.webmanifest',

  // ── Open Graph ───────────────────────────────────────────────────────────────
  openGraph: {
    title: 'DuroFiles — Free Professional Invoice Generator',
    description:
      'Create, customise, and download beautiful PDF invoices in seconds. No sign-up required.',
    url: 'https://durofiles.durozen.in',
    siteName: 'DuroFiles - Free Invoice Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DuroFiles — Free Professional Invoice Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'DuroFiles — Free Professional Invoice Generator',
    description: 'Create, customise, and download beautiful PDF invoices in seconds.',
    images: ['/og-image.png'],
    site: '@durofiles',
    creator: '@durofiles',
  },

  // ── Robots ───────────────────────────────────────────────────────────────────
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

  // ── Canonical ─────────────────────────────────────────────────────────────────
  alternates: {
    canonical: 'https://durofiles.durozen.in',
  },

  // ── App info ─────────────────────────────────────────────────────────────────
  applicationName: 'DuroFiles - Free Invoice Generator',
  category: 'business',
};

import { ThemeProvider } from "../components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "DuroFiles - Free Invoice Generator",
              "url": "https://durofiles.durozen.in"
            })
          }}
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }} className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
