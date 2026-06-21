import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../components/Header";
import { Geist } from "next/font/google";
import { cn } from "../lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "DuroFiles - Free Professional Invoice Generator",
  description: "Create, customize, and download beautiful PDF invoices in seconds. No sign-up required. Choose from multiple professional templates.",
  keywords: "invoice generator, free invoice maker, pdf invoice, business invoice, billing software",
  openGraph: {
    title: "DuroFiles - Free Professional Invoice Generator",
    description: "Create, customize, and download beautiful PDF invoices in seconds.",
    type: "website",
  }
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
