"use client";

import { useRouter } from 'next/navigation';
import { FileText, Zap, Shield, LayoutTemplate, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>

      {/* Hero Section */}
      <section style={{ padding: '100px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, color: '#0f172a', marginBottom: '24px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            Create Professional Invoices in <span style={{ color: 'var(--primary-color)' }}>Seconds</span>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
              Choose a Template and Start Creating Your Invoice Now
            </p>
            <button className="btn" onClick={() => router.push('/templates')} style={{ padding: '18px 40px', borderRadius: '12px', fontSize: '1.2rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)' }}>
              Create Invoice <ChevronRight size={24} />
            </button>
            <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '40px', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto 40px auto' }}>
            Generate, customize, and download beautiful invoices instantly — completely free. No signup, no login, no hidden charges.
          </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>Why Choose DuroFiles?</h2>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Built for speed and privacy. No accounts required.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', background: '#f8fafc', padding: '40px', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
            {[
              "100% Free",
              "No Signin",
              "GST & Tax Ready",
              "Download as PDF",
              "Add Logo, Signature & QR Payments"
            ].map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'white', padding: '20px 24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', border: '1px solid #f1f5f9' }}>
                <div style={{ background: '#ecfdf5', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <CheckCircle2 size={22} color="#10b981" />
                </div>
                <span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1e293b' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools / Features */}
     

      {/* FAQ */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '40px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '24px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Is this really free?</h4>
              <p style={{ color: '#64748b', lineHeight: 1.5 }}>Yes, DuroFiles is completely free. There are no hidden fees or subscriptions.</p>
            </div>
            <div style={{ padding: '24px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Where is my data stored?</h4>
              <p style={{ color: '#64748b', lineHeight: 1.5 }}>All your invoice data is stored locally on your device inside your browser. We do not transmit or save it to any cloud servers.</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
}
