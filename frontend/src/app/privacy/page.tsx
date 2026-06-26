"use client";

import { Footer } from '../../components/Footer';
import { Shield, Eye, Database, Lock, Mail, RefreshCw } from 'lucide-react';

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div className="mb-10 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 shrink-0">
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h2>
      <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base space-y-3">
        {children}
      </div>
    </div>
  </div>
);

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 text-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full px-4 py-1 mb-6 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Shield size={12} />
            <span>Last updated: June 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            We respect your privacy. Here's exactly what data we collect — and what we don't.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">

        {/* Intro card */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/20 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
          <p className="margin-0 text-emerald-800 dark:text-emerald-400 font-semibold text-sm md:text-base leading-relaxed">
            🔒 <strong>Short version:</strong> DuroFiles is a 100% client-side invoice tool.
            Your invoice data is stored <strong>only in your browser's localStorage</strong> — it never leaves your device and is never sent to our servers.
          </p>
        </div>

        <div className="space-y-12">
          <Section icon={Database} title="1. Information We Collect">
            <p className="font-bold text-slate-800 dark:text-slate-200">We do NOT collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name, email, or personal details</li>
              <li>Invoice content (items, amounts, client data)</li>
              <li>Payment or banking information</li>
              <li>Device identifiers or precise location</li>
            </ul>
            <p className="font-bold text-slate-800 dark:text-slate-200 mt-4">We may collect anonymously (via analytics, if enabled):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Page views and general usage patterns</li>
              <li>Browser type and approximate region (country level)</li>
              <li>Referrer URL</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">If you submit the Contact or Feedback form, we collect only the name, email, and message you voluntarily provide.</p>
          </Section>

          <Section icon={Eye} title="2. How We Use Your Information">
            <p>The anonymous analytics data is used solely to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Understand which templates and features are most popular</li>
              <li>Fix bugs and improve performance</li>
              <li>Make decisions about future features</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Contact/Feedback form submissions are used only to respond to your query. We do not use them for marketing purposes.</p>
          </Section>

          <Section icon={Lock} title="3. Data Storage & Security">
            <p>All invoice data you create is stored exclusively in <strong>your browser's localStorage</strong>. This means:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>It is never transmitted to our servers</li>
              <li>It is not accessible by Durozen Technologies or any third party</li>
              <li>Clearing your browser data will permanently delete your invoices</li>
              <li>Data does not sync across devices</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">We recommend downloading your invoices as PDFs for safe-keeping.</p>
          </Section>

          <Section icon={Shield} title="4. Cookies">
            <p>DuroFiles uses minimal cookies. We do not use advertising or tracking cookies.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Essential cookies:</strong> Required for the website to function correctly.</li>
              <li><strong>Analytics cookies:</strong> Anonymous usage data only, with no personal identifiers.</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">You can disable cookies in your browser settings at any time.</p>
          </Section>

          <Section icon={Database} title="5. Third-Party Services">
            <p>DuroFiles uses the following third-party services in limited ways:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Apps Script</strong> — used only to process Contact and Feedback form submissions. No invoice data is ever sent.</li>
              <li><strong>Google Fonts</strong> — to load website typography.</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">We do not sell, rent, or share any data with advertisers or data brokers.</p>
          </Section>

          <Section icon={RefreshCw} title="6. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of DuroFiles after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section icon={Mail} title="7. Contact Us">
            <p>If you have any questions or concerns about this Privacy Policy, please reach out:</p>
            <div className="mt-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 shadow-sm">
              <p className="font-bold text-slate-900 dark:text-white mb-2">Durozen Technologies Private Limited</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">📍 Namakkal, Tamil Nadu, India</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">
                📧 <a href="mailto:info@durozen.in" className="text-blue-600 dark:text-blue-400 hover:underline">info@durozen.in</a>
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm">📞 +(91) 81223 39694</p>
            </div>
          </Section>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-16">
          © {new Date().getFullYear()} Durozen Technologies Private Limited. All rights reserved.
        </p>
      </div>

      <Footer />
    </div>
  );
}
