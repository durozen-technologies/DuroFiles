import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'DuroFiles Privacy Policy — learn how we protect your data. All invoice data stays in your browser. We never collect or transmit your personal invoice information.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://durofiles.durozen.in'}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
