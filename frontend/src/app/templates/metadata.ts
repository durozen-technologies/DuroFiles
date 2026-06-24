import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Invoice Templates',
  description:
    'Browse free professional invoice templates. GST-ready, fully customisable, instant PDF download — no sign-up required.',
  keywords: [
    'free invoice templates', 'gst invoice template', 'pdf invoice template',
    'professional invoice', 'billing template',
  ],
  alternates: { canonical: 'https://durofiles.durozen.in/templates' },
  openGraph: {
    title: 'Invoice Templates | DuroFiles',
    description: 'Browse free professional invoice templates. GST-ready, instant PDF download.',
    url: 'https://durofiles.durozen.in/templates',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DuroFiles Invoice Templates' }],
  },
  twitter: {
    title: 'Invoice Templates | DuroFiles',
    description: 'Browse free professional invoice templates. GST-ready, instant PDF download.',
  },
};
