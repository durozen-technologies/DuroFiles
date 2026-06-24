import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Durozen Technologies. Reach out for custom invoice templates, branding, automation, and software solutions tailored to your business needs.',
  keywords: [
    'contact durofiles', 'durozen technologies contact', 'invoice support', 'business inquiry',
  ],
  alternates: { canonical: 'https://durofiles.durozen.in/contact' },
  openGraph: {
    title: 'Contact Us | DuroFiles',
    description: 'Reach out for custom invoice templates, branding, and software solutions.',
    url: 'https://durofiles.durozen.in/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Contact DuroFiles' }],
  },
  twitter: {
    title: 'Contact Us | DuroFiles',
    description: 'Reach out for custom invoice templates, branding, and software solutions.',
  },
};
