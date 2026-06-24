import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'DuroFiles Terms of Service — understand your rights and responsibilities when using our free invoice generator tool.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://durofiles.durozen.in'}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
