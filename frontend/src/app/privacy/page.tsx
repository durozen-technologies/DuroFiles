"use client";
import { Footer } from '../../components/Footer';
import { Shield, Eye, Database, Lock, Mail, RefreshCw } from 'lucide-react';

const Section = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '40px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
      <div style={{ padding: '8px', background: '#eff6ff', borderRadius: '10px', color: '#2563eb', flexShrink: 0 }}>
        <Icon size={20} />
      </div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>{title}</h2>
    </div>
    <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '0.97rem', paddingLeft: '44px' }}>
      {children}
    </div>
  </div>
);

export default function Privacy() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>

      {/* Hero */}
      <section style={{ padding: '70px 20px 50px', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '6px 16px', marginBottom: '16px' }}>
          <Shield size={14} color="#2563eb" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2563eb' }}>Last updated: June 2025</span>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          We respect your privacy. Here's exactly what data we collect — and what we don't.
        </p>
      </section>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>

        {/* Intro card */}
        <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '14px', padding: '20px 24px', marginBottom: '44px' }}>
          <p style={{ margin: 0, color: '#065f46', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.7 }}>
            🔒 <strong>Short version:</strong> DuroFiles is a 100% client-side invoice tool.
            Your invoice data is stored <strong>only in your browser's localStorage</strong> — it never leaves your device and is never sent to our servers.
          </p>
        </div>

        <Section icon={Database} title="1. Information We Collect">
          <p><strong>We do NOT collect:</strong></p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0 16px' }}>
            <li>Your name, email, or personal details</li>
            <li>Invoice content (items, amounts, client data)</li>
            <li>Payment or banking information</li>
            <li>Device identifiers or precise location</li>
          </ul>
          <p><strong>We may collect anonymously (via analytics, if enabled):</strong></p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>Page views and general usage patterns</li>
            <li>Browser type and approximate region (country level)</li>
            <li>Referrer URL</li>
          </ul>
          <p style={{ marginTop: '12px' }}>If you submit the Contact or Feedback form, we collect only the name, email, and message you voluntarily provide.</p>
        </Section>

        <Section icon={Eye} title="2. How We Use Your Information">
          <p>The anonymous analytics data is used solely to:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>Understand which templates and features are most popular</li>
            <li>Fix bugs and improve performance</li>
            <li>Make decisions about future features</li>
          </ul>
          <p style={{ marginTop: '12px' }}>Contact/Feedback form submissions are used only to respond to your query. We do not use them for marketing.</p>
        </Section>

        <Section icon={Lock} title="3. Data Storage & Security">
          <p>All invoice data you create is stored exclusively in <strong>your browser's localStorage</strong>. This means:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>It is never transmitted to our servers</li>
            <li>It is not accessible by Durozen Technologies or any third party</li>
            <li>Clearing your browser data will permanently delete your invoices</li>
            <li>Data does not sync across devices</li>
          </ul>
          <p style={{ marginTop: '12px' }}>We recommend downloading your invoices as PDFs for safe-keeping.</p>
        </Section>

        <Section icon={Shield} title="4. Cookies">
          <p>DuroFiles uses minimal cookies. We do not use advertising or tracking cookies.</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li><strong>Essential cookies:</strong> Required for the website to function correctly.</li>
            <li><strong>Analytics cookies:</strong> Anonymous usage data only, with no personal identifiers.</li>
          </ul>
          <p style={{ marginTop: '12px' }}>You can disable cookies in your browser settings at any time.</p>
        </Section>

        <Section icon={Database} title="5. Third-Party Services">
          <p>DuroFiles uses the following third-party services in limited ways:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li><strong>Google Apps Script</strong> — used only to process Contact and Feedback form submissions. No invoice data is ever sent.</li>
            <li><strong>Google Fonts</strong> — to load website typography.</li>
          </ul>
          <p style={{ marginTop: '12px' }}>We do not sell, rent, or share any data with advertisers or data brokers.</p>
        </Section>

        <Section icon={RefreshCw} title="6. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of DuroFiles after changes constitutes acceptance of the updated policy.</p>
        </Section>

        <Section icon={Mail} title="7. Contact Us">
          <p>If you have any questions or concerns about this Privacy Policy, please reach out:</p>
          <div style={{ marginTop: '12px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px 20px' }}>
            <p style={{ margin: '0 0 6px 0' }}><strong>Durozen Technologies Private Limited</strong></p>
            <p style={{ margin: '0 0 6px 0' }}>📍 Namakkal, Tamil Nadu, India</p>
            <p style={{ margin: '0 0 6px 0' }}>📧 <a href="mailto:info@durozen.in" style={{ color: '#2563eb' }}>info@durozen.in</a></p>
            <p style={{ margin: 0 }}>📞 +(91) 81223 39694</p>
          </div>
        </Section>

        <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', marginTop: '40px' }}>
          © {new Date().getFullYear()} Durozen Technologies Private Limited. All rights reserved.
        </p>
      </div>

      <Footer />
    </div>
  );
}
