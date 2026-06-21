"use client";

import { useRouter } from 'next/navigation';
import { Footer } from '../../components/Footer';
import { FileText, Search } from 'lucide-react';

export default function Tools() {
  const router = useRouter();

  const ToolCard = ({ icon, title, desc, btn }: any) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }} className="tool-card" onClick={() => router.push('/dashboard')}>
      <div style={{ width: '48px', height: '48px', background: '#eff6ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#3b82f6' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{title}</h3>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px', flex: 1 }}>{desc}</p>
      <button style={{ background: '#f1f5f9', color: '#3b82f6', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}>
        {btn} &rarr;
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      
      <div style={{ padding: '60px 20px', textAlign: 'center', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>All DuroFiles Tools</h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto 30px' }}>Every tool you need to use PDFs, manage clients, and track expenses at your fingertips.</p>
        
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '16px', top: '16px' }} />
          <input 
            type="text" 
            placeholder="Search tools..." 
            style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem', outline: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
          />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* Invoice Tools */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>Create Invoices</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px', marginBottom: '60px' }}>
          <ToolCard icon={<FileText size={24} />} title="Invoice Generator" desc="Create professional invoices in seconds." btn="Create Invoice" />
        </div>
        
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
}
