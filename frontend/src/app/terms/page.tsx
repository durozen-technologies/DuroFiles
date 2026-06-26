"use client";

import { Footer } from '../../components/Footer';
import { FileText, CheckCircle2, AlertTriangle, Scale, RefreshCw, Mail } from 'lucide-react';

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

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 text-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full px-4 py-1 mb-6 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <FileText size={12} />
            <span>Last updated: June 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            By using DuroFiles, you agree to these terms. Please read them carefully.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16">

        {/* Intro card */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-900/30 rounded-3xl p-6 md:p-8 mb-12 shadow-sm">
          <p className="margin-0 text-blue-850 dark:text-blue-400 font-semibold text-sm md:text-base leading-relaxed">
            📋 <strong>Short version:</strong> DuroFiles is a free, browser-based invoice tool. Use it for lawful purposes. Your data stays on your device. We provide it "as is" and are not liable for any financial decisions made using generated invoices.
          </p>
        </div>

        <div className="space-y-12">
          <Section icon={CheckCircle2} title="1. Acceptance of Terms">
            <p>By accessing or using DuroFiles at <strong>durofiles.durozen.in</strong> (the "Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the Service.</p>
            <p className="mt-2 text-slate-500 dark:text-slate-400">These terms apply to all visitors and users of the Service.</p>
          </Section>

          <Section icon={FileText} title="2. Description of Service">
            <p>DuroFiles is a free, browser-based invoice generator that allows you to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create and customise professional invoices</li>
              <li>Choose from multiple invoice templates</li>
              <li>Add GST, taxes, and payment details</li>
              <li>Download invoices as PDF files</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">The Service is provided free of charge with no account or sign-up required. All invoice data is stored locally in your browser.</p>
          </Section>

          <Section icon={CheckCircle2} title="3. Acceptable Use">
            <p>You agree to use DuroFiles only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Create fraudulent, fake, or misleading invoices</li>
              <li>Use the Service to impersonate any person or business</li>
              <li>Attempt to reverse-engineer or exploit the Service</li>
              <li>Use automated tools to scrape or abuse the Service</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">We reserve the right to deny access to anyone who violates these terms.</p>
          </Section>

          <Section icon={AlertTriangle} title="4. Disclaimer of Warranties">
            <p>DuroFiles is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, either express or implied. We do not warrant that:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>The Service will be uninterrupted, error-free, or secure</li>
              <li>Invoices generated are legally valid in your jurisdiction</li>
              <li>The Service meets your specific business requirements</li>
              <li>Any errors in the Service will be corrected</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">You are solely responsible for verifying the accuracy of invoices before sharing them with clients or submitting them for tax purposes.</p>
          </Section>

          <Section icon={Scale} title="5. Limitation of Liability">
            <p>To the fullest extent permitted by law, Durozen Technologies Private Limited shall not be liable for any:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Loss of data (including invoices stored in your browser)</li>
              <li>Financial loss arising from use of generated invoices</li>
              <li>Tax penalties or legal issues arising from invoice content</li>
              <li>Indirect, incidental, or consequential damages</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Since all invoice data is stored in your browser's localStorage, we have no access to or control over your data. We are not responsible for data loss due to browser clearing, device changes, or technical failures.</p>
          </Section>

          <Section icon={FileText} title="6. Intellectual Property">
            <p>The DuroFiles platform, design, templates, and branding are owned by <strong>Durozen Technologies Private Limited</strong>. All rights reserved.</p>
            <p className="mt-2 text-slate-500 dark:text-slate-400">The content of invoices you create belongs to you. You retain full ownership of the invoice data and PDFs you generate.</p>
            <p className="mt-2 text-slate-500 dark:text-slate-400">You may not copy, reproduce, or redistribute any part of the DuroFiles platform without prior written consent.</p>
          </Section>

          <Section icon={CheckCircle2} title="7. Free Service & Changes">
            <p>DuroFiles is currently provided free of charge. We reserve the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Modify, suspend, or discontinue the Service at any time</li>
              <li>Introduce paid features or plans in the future</li>
              <li>Change these Terms of Service with reasonable notice</li>
            </ul>
            <p className="mt-4 text-slate-500 dark:text-slate-400">Continued use of the Service after changes constitutes acceptance of the updated terms.</p>
          </Section>

          <Section icon={Scale} title="8. Governing Law">
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Tamil Nadu, India</strong>.</p>
          </Section>

          <Section icon={RefreshCw} title="9. Changes to These Terms">
            <p>We may update these Terms of Service periodically. We will indicate the date of the most recent update at the top of this page. We encourage you to review these terms regularly.</p>
          </Section>

          <Section icon={Mail} title="10. Contact Us">
            <p>For any questions about these Terms of Service:</p>
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
