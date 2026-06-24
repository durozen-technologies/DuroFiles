"use client";
import { Footer } from '../../components/Footer';
import { FileText, CheckCircle2, AlertTriangle, Scale, RefreshCw, Mail } from 'lucide-react';

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

export default function Terms() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>

      {/* Hero */}
      <section style={{ padding: '70px 20px 50px', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '999px', padding: '6px 16px', marginBottom: '16px' }}>
          <FileText size={14} color="#2563eb" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2563eb' }}>Last updated: June 2025</span>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>Terms of Service</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          By using DuroFiles, you agree to these terms. Please read them carefully.
        </p>
      </section>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>

        {/* Intro card */}
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '14px', padding: '20px 24px', marginBottom: '44px' }}>
          <p style={{ margin: 0, color: '#1e40af', fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.7 }}>
            📋 <strong>Short version:</strong> DuroFiles is a free, browser-based invoice tool. Use it for lawful purposes. Your data stays on your device. We provide it "as is" and are not liable for any financial decisions made using generated invoices.
          </p>
        </div>

        <Section icon={CheckCircle2} title="1. Acceptance of Terms">
          <p>By accessing or using DuroFiles at <strong>durofiles.durozen.in</strong> (the "Service"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the Service.</p>
          <p style={{ marginTop: '12px' }}>These terms apply to all visitors and users of the Service.</p>
        </Section>

        <Section icon={FileText} title="2. Description of Service">
          <p>DuroFiles is a free, browser-based invoice generator that allows you to:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>Create and customise professional invoices</li>
            <li>Choose from multiple invoice templates</li>
            <li>Add GST, taxes, and payment details</li>
            <li>Download invoices as PDF files</li>
          </ul>
          <p style={{ marginTop: '12px' }}>The Service is provided free of charge with no account or sign-up required. All invoice data is stored locally in your browser.</p>
        </Section>

        <Section icon={CheckCircle2} title="3. Acceptable Use">
          <p>You agree to use DuroFiles only for lawful purposes. You must not:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>Create fraudulent, fake, or misleading invoices</li>
            <li>Use the Service to impersonate any person or business</li>
            <li>Attempt to reverse-engineer or exploit the Service</li>
            <li>Use automated tools to scrape or abuse the Service</li>
            <li>Violate any applicable laws or regulations</li>
          </ul>
          <p style={{ marginTop: '12px' }}>We reserve the right to deny access to anyone who violates these terms.</p>
        </Section>

        <Section icon={AlertTriangle} title="4. Disclaimer of Warranties">
          <p>DuroFiles is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, either express or implied. We do not warrant that:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>The Service will be uninterrupted, error-free, or secure</li>
            <li>Invoices generated are legally valid in your jurisdiction</li>
            <li>The Service meets your specific business requirements</li>
            <li>Any errors in the Service will be corrected</li>
          </ul>
          <p style={{ marginTop: '12px' }}>You are solely responsible for verifying the accuracy of invoices before sharing them with clients or submitting them for tax purposes.</p>
        </Section>

        <Section icon={Scale} title="5. Limitation of Liability">
          <p>To the fullest extent permitted by law, Durozen Technologies Private Limited shall not be liable for any:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>Loss of data (including invoices stored in your browser)</li>
            <li>Financial loss arising from use of generated invoices</li>
            <li>Tax penalties or legal issues arising from invoice content</li>
            <li>Indirect, incidental, or consequential damages</li>
          </ul>
          <p style={{ marginTop: '12px' }}>Since all invoice data is stored in your browser's localStorage, we have no access to or control over your data. We are not responsible for data loss due to browser clearing, device changes, or technical failures.</p>
        </Section>

        <Section icon={FileText} title="6. Intellectual Property">
          <p>The DuroFiles platform, design, templates, and branding are owned by <strong>Durozen Technologies Private Limited</strong>. All rights reserved.</p>
          <p style={{ marginTop: '12px' }}>The content of invoices you create belongs to you. You retain full ownership of the invoice data and PDFs you generate.</p>
          <p style={{ marginTop: '12px' }}>You may not copy, reproduce, or redistribute any part of the DuroFiles platform without prior written consent.</p>
        </Section>

        <Section icon={CheckCircle2} title="7. Free Service & Changes">
          <p>DuroFiles is currently provided free of charge. We reserve the right to:</p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
            <li>Modify, suspend, or discontinue the Service at any time</li>
            <li>Introduce paid features or plans in the future</li>
            <li>Change these Terms of Service with reasonable notice</li>
          </ul>
          <p style={{ marginTop: '12px' }}>Continued use of the Service after changes constitutes acceptance of the updated terms.</p>
        </Section>

        <Section icon={Scale} title="8. Governing Law">
          <p>These Terms of Service shall be governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes shall be subject to the exclusive jurisdiction of the courts in <strong>Tamil Nadu, India</strong>.</p>
        </Section>

        <Section icon={RefreshCw} title="9. Changes to These Terms">
          <p>We may update these Terms of Service periodically. We will indicate the date of the most recent update at the top of this page. We encourage you to review these terms regularly.</p>
        </Section>

        <Section icon={Mail} title="10. Contact Us">
          <p>For any questions about these Terms of Service:</p>
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
