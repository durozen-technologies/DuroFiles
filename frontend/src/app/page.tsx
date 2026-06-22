"use client";

import { useRouter } from 'next/navigation';
import { FileText, Zap, Shield, LayoutTemplate, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Footer } from '../components/Footer';

export default function Home() {
  const router = useRouter();

  const features = [
    { icon: <LayoutTemplate size={24} color="#2563eb" />, title: "Beautiful Templates", desc: "Professionally designed templates that make your business look great." },
    { icon: <Shield size={24} color="#16a34a" />, title: "100% Private", desc: "All data stays on your device. We never store or track your invoices." },
    { icon: <Zap size={24} color="#ea580c" />, title: "Lightning Fast", desc: "Generate PDFs instantly without waiting for slow server responses." },
    { icon: <FileText size={24} color="#9333ea" />, title: "Multiple Formats", desc: "Export to PDF, Excel, or CSV with a single click." },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      
      {/* Hero Section */}
      <section style={{ padding: '120px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '24px', lineHeight: 1.1 }}>
            Every tool you need to create and manage invoices.
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '40px', lineHeight: 1.6 }}>
            Fast, secure, and professional invoicing platform for freelancers and businesses. Completely free to use.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => router.push('/dashboard')} style={{ background: 'var(--primary-color)', color: 'white', padding: '16px 32px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px var(--primary-color)' }}>
              Create Invoice <ChevronRight size={20} />
            </button>
            <button onClick={() => router.push('/templates')} style={{ background: 'white', color: '#0f172a', padding: '16px 32px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 600, border: '1px solid #cbd5e1', cursor: 'pointer', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
              Browse Templates
            </button>
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
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
            {features.map((f, i) => (
              <div key={i} style={{ padding: '30px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }} className="feature-card">
                <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools / Features */}
      <section style={{ padding: '80px 20px', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '40px' }}>Popular Features</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {['Invoice Generator'].map((tool, i) => (
              <div key={i} style={{ background: 'white', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e2e8f0', cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>
                <CheckCircle2 size={24} color="#3b82f6" />
                <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
