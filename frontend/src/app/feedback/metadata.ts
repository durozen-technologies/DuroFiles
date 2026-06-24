import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Feedback',
  description:
    'Share your feedback about DuroFiles — the free online invoice generator. Help us improve with your suggestions, ratings, and comments.',
  keywords: ['durofiles feedback', 'invoice generator review', 'app feedback'],
  alternates: { canonical: 'https://durofiles.durozen.in/feedback' },
  openGraph: {
    title: 'Share Your Feedback | DuroFiles',
    description: 'Help us improve DuroFiles with your suggestions and ratings.',
    url: 'https://durofiles.durozen.in/feedback',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DuroFiles Feedback' }],
  },
  twitter: {
    title: 'Share Your Feedback | DuroFiles',
    description: 'Help us improve DuroFiles with your suggestions and ratings.',
  },
};
