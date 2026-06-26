import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'standalone' is for Docker/self-hosted — Netlify plugin manages its own output
  // Remove it so @netlify/plugin-nextjs works correctly
  allowedDevOrigins: [
    'cards-acids-taken-img.trycloudflare.com',
    '913cba346180db.lhr.life',
    '192.168.1.8',
    '192.168.1.5',
  ],
  // Recommended for production image optimisation on Netlify
  images: {
    unoptimized: true,
  },
  turbopack: {},
};

export default withSerwist(nextConfig);
